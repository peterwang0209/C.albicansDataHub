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

function insertFu2021Data(FilePath, DBFilePath) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DBFilePath, (err) => {
      if (err) {
        console.error(`Error opening database: ${err.message}`);
        reject(err);
      }
    });

    LoadData(FilePath).then(data => {
      const columnNames = data[0];
      const columns = columnNames.map((columnName, index) => {
        return index === 0 ? `${columnName} TEXT PRIMARY KEY` : `${columnName} TEXT`;
      });

      new Promise((innerResolve, innerReject) => {
        db.serialize(() => {
          db.run(`DROP TABLE IF EXISTS Fu2021Table`, (err) => {
            if (err) {
              console.error(`Error dropping table: ${err.message}`);
              innerReject(err);
            }

            db.run(`CREATE TABLE Fu2021Table (${columns.join(", ")})`, (err) => {
              if (err) {
                console.error(`Error creating table: ${err.message}`);
                innerReject(err);
              }

              Promise.all(data.slice(1).map(row => {
                return new Promise((insertResolve, insertReject) => {
                  const primaryKey = row[0]?.toString();
                  const attributes = row.slice(1);
                  const placeholders = columnNames.map(() => "?").join(",");
                  const sql = `INSERT INTO Fu2021Table (${columnNames.join(", ")}) VALUES (${placeholders})`;
                  const rowData = [primaryKey, ...attributes];

                  db.run(sql, rowData, (err) => {
                    if (err) {
                      console.error(`Error inserting data: ${err.message}`);
                      insertReject(err);
                    }
                    insertResolve();
                  });
                });
              })).then(innerResolve).catch(innerReject);
            });
          });
        });
      }).then(() => {
        console.log("FU2021 Data inserted successfully.");
        resolve();
      }).catch(reject)
        .finally(() => {
          db.close(() => {
            console.log("Database closed.");
          });
        });

    }).catch(reject);
  });
}

module.exports = {
  insertFu2021Data,
};

// const dbFilePath = "./database.db";
// const Fu2021GenePath = "../data/C_albicans_mapped_names_Fu2021_6638_genes.tsv";

// (async () => {
//   try {
//     await insertFu2021Data(Fu2021GenePath, dbFilePath);
//   } catch (error) {
//     console.error('Error inserting InVitro Data:', error);
//   }
// })();
