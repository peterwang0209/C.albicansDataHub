const knex = require("./knex");

function getAllData() {
    return knex("TestTable").select('*');
}

function JoinData() {
    return knex("MutantFeatureGenesTable").join("Fu2021Table", "MutantFeatureGenesTable.id", "=", "Fu2021Table.Feature_name").select('*');
}

module.exports = {
    getAllData,
    JoinData
}