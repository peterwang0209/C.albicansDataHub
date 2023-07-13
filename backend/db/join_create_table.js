const sqlite3 = require("sqlite3").verbose();

async function joinTable(DBFilePath) {
    const db = new sqlite3.Database(DBFilePath);
    db.serialize(() => {
        const dropTableSql = `DROP TABLE IF EXISTS JoinedTable`;
        db.run(dropTableSql, (err) => {
            if (err) {
              console.error(err.message);
              return;
            }
            
            // Assume the structure of your table matches the structure of the join result
            const createTableSql = `CREATE TABLE JoinedTable AS SELECT * FROM MutantFeatureGenesTable 
            INNER JOIN Fu2021Table ON MutantFeatureGenesTable.id = Fu2021Table.Feature_name`;

            db.run(createTableSql, (err) => {
              if (err) {
                console.error(err.message);
                return;
              }
              console.log("Joined Table created successfully.");
              db.close();
            });
        });
    });
}

module.exports = {
    joinTable,
};
