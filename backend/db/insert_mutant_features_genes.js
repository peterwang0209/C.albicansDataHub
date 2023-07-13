const xlsx = require("xlsx");
const sqlite3 = require("sqlite3").verbose();

function insertDataFromExcel(excelFilePath, dbFilePath) {
  // Create a new SQLite3 database connection
  const db = new sqlite3.Database(dbFilePath);

  // Read the Excel file and insert data from the second sheet into the database
  const workbook = xlsx.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[1];
  const worksheet = workbook.Sheets[sheetName];
  let jsonData_raw = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  const jsonData = jsonData_raw.filter((row) =>
    row.some((cell) => cell !== null && cell !== "")
  );
  // Get column names from the second row in your Excel file
  // id attr1 attr2 attr3 ...
  const columnNames = jsonData[1];

  // Compose the SQL snippet
  const columns = columnNames.map((columnName, index) => {
    if (index === 0) {
      // Use the first column as the primary key column
      return `${columnName} TEXT PRIMARY KEY`;
    } else {
      // Treat the remaining columns as float number attributes
      return `${columnName} REAL`;
    }
  });
  // Create SQL DB
  // Create or reset SQL DB
  db.serialize(() => {
    const dropTableSql = `DROP TABLE IF EXISTS MutantFeatureGenesTable`;
    db.run(dropTableSql, (err) => {
      if (err) {
        console.error(err.message);
        return;
      }

      const createTableSql = `CREATE TABLE MutantFeatureGenesTable (${columns.join(", ")})`;
      db.run(createTableSql, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }

        // For each data entry start from row 2, insert it to DB
        jsonData.slice(2).forEach((row, i) => {
          try {
            const primaryKey = row[0]?.toString();
            if (!primaryKey) {
              console.warn(
                `Row ${
                  i + 3
                }: Primary key is missing or cannot be converted to string`
              );
              return;
            }

            const attributes = row.slice(1).map((cell, j) => {
              const num = parseFloat(cell);
              if (isNaN(num)) {
                console.warn(
                  `Row ${i + 3}, Column ${j + 2}: Cannot be converted to number`
                );
                return null;
              }
              return num;
            });

            const placeholders = columnNames.map((_, i) => "?").join(",");
            const sql = `INSERT INTO MutantFeatureGenesTable (${columnNames.join(
              ", "
            )}) VALUES (${placeholders})`;

            const data = [primaryKey, ...attributes];

            db.run(sql, data, (err) => {
              if (err) {
                console.error(`Row ${i + 3}: ${err.message}`);
              }
            });
          } catch (err) {
            console.error(`Row ${i + 3}: Unexpected error - ${err.message}`);
          }
        });

        console.log("Mutant Feautres Data inserted successfully.");
        db.close();
      });
    });
  });
}

module.exports = {
  insertDataFromExcel,
};
