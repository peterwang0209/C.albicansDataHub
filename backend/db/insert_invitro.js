const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const readline = require("readline");

async function LoadData(FilePath) {
  try {
    const fileStream = fs.createReadStream(FilePath);
    const lines = readline.createInterface({
      input: fileStream,
    });

    let data = [];
    for await (const line of lines) {
      const row = line.split("\t");
      data.push(row);
    }
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}

async function insertInVitroData(FilePath, DBFilePath) {
  const db = new sqlite3.Database(DBFilePath);
  const data = await LoadData(FilePath);
  const columnNames = data[0];
  const columns = columnNames.map((columnName, index) => {
    if (index === 0) {
      // Use the first column as the primary key column
      return `${columnName} TEXT PRIMARY KEY`;
    } else {
      // Treat the remaining columns as float number attributes
      return `${columnName} TEXT`;
    }
  });
  db.serialize(() => {
    const dropTableSql = `DROP TABLE IF EXISTS InVitroTable`;
    db.run(dropTableSql, (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
      const createTableSql = `CREATE TABLE InVitroTable (${columns.join(", ")})`;
      db.run(createTableSql, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
        // For each data entry start from row 2, insert it to DB
        data.slice(1).forEach((row, i) => {
          try {
            const primaryKey = row[0]?.toString();
            const attributes = row.slice(1);
            const placeholders = columnNames.map((_, i) => "?").join(",");
            const sql = `INSERT INTO InVitroTable (${columnNames.join(
              ", "
            )}) VALUES (${placeholders})`;
            const data = [primaryKey, ...attributes];
            db.run(sql, data, (err) => {
              if (err) {
                console.error(`${err.message}`);
              }
            });
          } catch (err) {
            console.error(`${err.message}`);
          }
        });

        console.log("In Vitro Data inserted successfully.");
        db.close();
      });
    });
  });
}

module.exports = {
    insertInVitroData,
};

// const dbFilePath = "./database.db";
// const invitroPath = "../data/in_vitro_summary_mod_t_test_compare_median_normvar_02282023.tsv";

// (async () => {
//   try {
//     await insertInVitroData(invitroPath, dbFilePath);
//   } catch (error) {
//     console.error('Error inserting InVitro Data:', error);
//   }
// })();
