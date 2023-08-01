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

async function grace1DataImageRelated(FilePath, DBFilePath) {
  const db = new sqlite3.Database(DBFilePath);
  const data = await LoadData(FilePath);
  let columnNames = data[0];
  // Replace spaces with underscores in column names
  columnNames = columnNames.map((name) => name.replace(/ /g, "_"));
  const columns = columnNames.map((columnName, index) => {
    if (index === 0) {
      // Use the first column as the primary key column
      return `${columnName} TEXT PRIMARY KEY`;
    } else if (
      index === 1 ||
      index === 2 ||
      index === 3 ||
      index === 4 ||
      index === 7
    ) {
      // Treat columns 2 (Note), 3 (Merck Strain ID), 4 (GRACE_Plate), 5 (GRACE_Position) and 8 (Essential_verdict) as TEXT type
      return `${columnName} TEXT`;
    } else {
      // Treat the remaining columns as REAL type
      return `${columnName} REAL`;
    }
  });
  // rest of the function

  db.serialize(() => {
    const dropTableSql = `DROP TABLE IF EXISTS GraceV1ImageRelatedTable`;
    db.run(dropTableSql, (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
      const createTableSql = `CREATE TABLE GraceV1ImageRelatedTable (${columns.join(
        ", "
      )})`;
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
            const sql = `INSERT INTO GraceV1ImageRelatedTable (${columnNames.join(
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

        console.log("Updated Data inserted successfully.");
        db.close();
      });
    });
  });
}

module.exports = {
  grace1DataImageRelated,
};
