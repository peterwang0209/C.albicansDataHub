const xlsx = require("xlsx");
const sqlite3 = require("sqlite3").verbose();

async function insert_GI_D10_DataFromExcel(excelFilePath, dbFilePath) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
        return reject(err);
      }
    });

    // Read the Excel file
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[2];
    const worksheet = workbook.Sheets[sheetName];
    let jsonData_raw = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const jsonData = jsonData_raw.filter((row) =>
      row.some((cell) => cell !== null && cell !== "")
    );

    // Get column names
    const columnNames = jsonData[0];
    const sanitizedColumnNames = columnNames.map((columnName) =>
        columnName.toString().replace(/[.,\s()<>|:;-]+/g, '_').replace(/-/g, 'neg')
    );
    const columns = sanitizedColumnNames.map((columnName, index) => {
      let dataType = "TEXT"; // Default data type
      if (index === 0) {
        dataType = "TEXT PRIMARY KEY";
      } else {
        const sampleData = jsonData[1][index];
        if (!isNaN(parseFloat(sampleData)) && isFinite(sampleData)) {
          dataType = "REAL";
        }
      }
      return `"${columnName}" ${dataType}`;
    });

    db.serialize(() => {
      const dropTableSql = `DROP TABLE IF EXISTS GI_D10_Table`;
      db.run(dropTableSql, (err) => {
        if (err) {
          console.error(err.message);
          return reject(err);
        }

        const createTableSql = `CREATE TABLE GI_D10_Table (${columns.join(
          ", "
        )})`;
        db.run(createTableSql, (err) => {
          if (err) {
            console.error(err.message);
            return reject(err);
          }

          // Insert data
          const insertPromises = jsonData.slice(1).map((row, i) => {
            return new Promise((insertResolve) => {
              const primaryKey = row[0]?.toString();
              if (!primaryKey) {
                console.warn(
                  `Row ${
                    i + 3
                  }: Primary key is missing or cannot be converted to string`
                );
                return insertResolve();
              }

              const attributes = row.slice(1).map((cell, j) => {
                if (columns[j + 1].includes("REAL")) {
                  const num = parseFloat(cell);
                  return isNaN(num) ? null : num;
                } else {
                  return cell?.toString() || null;
                }
              });

              const placeholders = sanitizedColumnNames
                .map(() => "?")
                .join(",");
              const sql = `INSERT INTO GI_D10_Table (${sanitizedColumnNames.join(
                ", "
              )}) VALUES (${placeholders})`;

              const data = [primaryKey, ...attributes];

              db.run(sql, data, (err) => {
                if (err) {
                  console.error(`Row ${i + 3}: ${err.message}`);
                  console.error(`Failed SQL: ${sql}`);
                  console.error(`Data: ${JSON.stringify(data)}`);
                }
                insertResolve();
              });
            });
          });

          Promise.all(insertPromises)
            .then(() => {
              console.log("GI_D10 Data inserted successfully.");
              db.close();
              resolve();
            })
            .catch((err) => {
              console.error("Error inserting data:", err);
              db.close();
              reject(err);
            });
        });
      });
    });
  });
}

module.exports = {
    insert_GI_D10_DataFromExcel,
};


// // Usage
// const dbFilePath = "./database.db";
// const excelFilePath = "../data/Final_summary_mod_t_results_10112023.xlsx";

// (async () => {
//   try {
//     await insert_GI_D10_DataFromExcel(excelFilePath, dbFilePath);
//     console.log("Insertion completed.");
//   } catch (error) {
//     console.error("Error inserting data:", error);
//   }
// })();
