const sqlite3 = require("sqlite3").verbose();
const fs = require("fs").promises; // use the promise-based version of fs
const path = require("path");

async function LoadData(FilePath) {
  try {
    data = {};
    const fileNames = await fs.readdir(FilePath);
    const filePromises = fileNames.map(async (filename) => {
      const name = path.parse(filename).name;
      const filepath = path.resolve(FilePath, filename);
      try {
        const content = await fs.readFile(filepath, "base64");
        data[name] = content;
      } catch (err) {
        console.error(err);
      }
    });
    // Wait for all files to be read before returning
    await Promise.all(filePromises);
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}

function insertImage(FilePath, DBFilePath) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DBFilePath, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
        reject(err); // Changed to reject the promise
      }
    });

    LoadData(FilePath).then(data => {
      new Promise((innerResolve, innerReject) => {
        const createTableSql = `
          CREATE TABLE IF NOT EXISTS GraceTable (
            GraceVersion TEXT, 
            PlateNumber TEXT, 
            DOX BLOB, 
            No_Dox BLOB,
            PRIMARY KEY (GraceVersion, PlateNumber)
          )`;

        db.run(createTableSql, (err) => {
          if (err) {
            console.error("Error creating table:", err.message);
            innerReject(err);
          } else {
            const insertPromises = Object.entries(data).map(([key, value]) => {
              return new Promise((insertResolve, insertReject) => {
                let [graceVersion, plateNumber, doxStat] = key.split(" ");
                let doxColumn = doxStat.includes("DOX") ? "DOX" : "No_Dox";
                let sql = `INSERT INTO GraceTable (GraceVersion, PlateNumber, ${doxColumn}) 
                             VALUES (?, ?, ?)
                             ON CONFLICT(GraceVersion, PlateNumber) DO UPDATE SET ${doxColumn} = excluded.${doxColumn}`;

                db.run(sql, [graceVersion, plateNumber, value], (err) => {
                  if (err) {
                    console.error("Error inserting data:", err.message);
                    insertReject(err);
                  } else {
                    insertResolve();
                  }
                });
              });
            });

            Promise.all(insertPromises)
              .then(innerResolve)
              .catch(innerReject);
          }
        });
      })
      .then(() => {
        console.log("Grace Image inserted successfully.");
        resolve();
      })
      .catch((err) => {
        console.error("Error during data insertion:", err);
        reject(err);
      })
      .finally(() => {
        db.close(() => {
          console.log("Database closed.");
        });
      });
    }).catch(reject);
  });
}

module.exports = {
  insertImage,
};


module.exports = {
  insertImage,
};
