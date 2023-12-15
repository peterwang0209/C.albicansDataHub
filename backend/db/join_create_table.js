const sqlite3 = require("sqlite3").verbose();

function joinTable(DBFilePath) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(DBFilePath, (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
                return reject(err);
            }
        });

        db.serialize(() => {
            const dropTableSql = `DROP TABLE IF EXISTS JoinedTable`;
            db.run(dropTableSql, (err) => {
                if (err) {
                    console.error(err.message);
                    db.close();
                    return reject(err);
                }

                const createTableSql = `CREATE TABLE JoinedTable AS SELECT * FROM MutantFeatureGenesTable 
                INNER JOIN Fu2021Table ON MutantFeatureGenesTable.id = Fu2021Table.Feature_name`;

                db.run(createTableSql, (err) => {
                    db.close();
                    if (err) {
                        console.error(err.message);
                        return reject(err);
                    }
                    console.log("Joined Table created successfully.");
                    resolve();
                });
            });
        });
    });
}

module.exports = {
    joinTable,
};
