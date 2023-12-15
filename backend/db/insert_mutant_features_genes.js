const xlsx = require("xlsx");
const sqlite3 = require("sqlite3").verbose();

function insertDataFromExcel(excelFilePath, dbFilePath) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
        return reject(err);
      }
    });

    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[1];
    const worksheet = workbook.Sheets[sheetName];
    let jsonData_raw = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const jsonData = jsonData_raw.filter((row) =>
      row.some((cell) => cell !== null && cell !== "")
    );

    const columnNames = jsonData[1];
    const columns = columnNames.map((columnName, index) => {
      return index === 0 ? `${columnName} TEXT PRIMARY KEY` : `${columnName} REAL`;
    });

    new Promise((innerResolve, innerReject) => {
      db.serialize(() => {
        const dropTableSql = `DROP TABLE IF EXISTS MutantFeatureGenesTable`;
        db.run(dropTableSql, (err) => {
          if (err) {
            console.error(err.message);
            return innerReject(err);
          }

          const createTableSql = `CREATE TABLE MutantFeatureGenesTable (${columns.join(", ")})`;
          db.run(createTableSql, (err) => {
            if (err) {
              console.error(err.message);
              return innerReject(err);
            }

            const insertPromises = jsonData.slice(2).map((row, i) => {
              return new Promise((insertResolve, insertReject) => {
                const primaryKey = row[0]?.toString();
                if (!primaryKey) {
                  console.warn(`Row ${i + 3}: Primary key is missing or cannot be converted to string`);
                  return insertResolve();
                }

                const attributes = row.slice(1).map((cell, j) => {
                  const num = parseFloat(cell);
                  return isNaN(num) ? null : num;
                });

                const placeholders = columnNames.map(() => "?").join(",");
                const sql = `INSERT INTO MutantFeatureGenesTable (${columnNames.join(", ")}) VALUES (${placeholders})`;
                const data = [primaryKey, ...attributes];

                db.run(sql, data, (err) => {
                  if (err) {
                    console.error(`Row ${i + 3}: ${err.message}`);
                    return insertReject(err);
                  }
                  insertResolve();
                });
              });
            });

            Promise.all(insertPromises)
              .then(innerResolve)
              .catch(innerReject);
          });
        });
      });
    })
    .then(() => {
      console.log("Mutant Features Data inserted successfully.");
      resolve();
    })
    .catch((err) => {
      console.error("Error inserting data:", err);
      reject(err);
    })
    .finally(() => {
      db.close(() => {
        console.log("Database closed.");
      });
    });
  });
}

module.exports = {
  insertDataFromExcel,
};

// Usage
// const dbFilePath = "./database.db";
// const excelFilePath = "../data/your_excel_file.xlsx";

// (async () => {
//   try {
//     await insertDataFromExcel(excelFilePath, dbFilePath);
//     console.log("Insertion completed.");
//   } catch (error) {
//     console.error("Error inserting data:", error);
//   }
// })();
