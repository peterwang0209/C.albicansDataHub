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
  const columnNames = data[0].map(column => `"${column}"`); // Enclose column names in quotes

  const columns = columnNames.map((columnName, index) => {
    if (index === 0) {
      return `${columnName} TEXT PRIMARY KEY`;
    } else {
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
        data.slice(1).forEach((row) => {
          const placeholders = row.map(_ => '?').join(", ");
          const sql = `INSERT INTO InVitroTable (${columnNames.join(", ")}) VALUES (${placeholders})`;
          db.run(sql, row, (err) => {
            if (err) {
              console.error(err.message);
            }
          });
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
