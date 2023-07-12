const knex = require("knex");
const connectKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "./db/database.db"
    }
});

module.exports = connectKnex;