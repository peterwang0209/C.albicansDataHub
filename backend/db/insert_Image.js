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

async function insertImage(FilePath, DBFilePath) {
  const db = new sqlite3.Database(DBFilePath);
  const data = await LoadData(FilePath);

  // Only create table once, if it doesn't exist.
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
      console.log(err.message);
      return;
    }

    // Insert data into the table
    Object.entries(data).forEach(([key, value]) => {
      try {
        let [graceVersion, plateNumber, doxStat] = key.split(" ");
        let doxColumn = doxStat.includes("DOX") ? "DOX" : "No_Dox";
        let sql = `INSERT INTO GraceTable (GraceVersion, PlateNumber, ${doxColumn}) 
                     VALUES (?, ?, ?)
                     ON CONFLICT(GraceVersion, PlateNumber) DO UPDATE SET ${doxColumn} = excluded.${doxColumn}`;
        db.run(sql, [graceVersion, plateNumber, value], function (err) {
          if (err) {
            console.error(err.message);
            return;
          }
        });
      } catch (err) {
        console.error(err.message);
      }
    });
    console.log("Grace Image inserted successfully.");
    db.close();
  });
}

module.exports = {
  insertImage,
};
