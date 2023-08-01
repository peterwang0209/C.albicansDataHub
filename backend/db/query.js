const knex = require("./knex");

function getAllData() {
  return knex("TestTable").select("*");
}

function JoinData() {
  return knex("MutantFeatureGenesTable")
    .join(
      "Fu2021Table",
      "MutantFeatureGenesTable.id",
      "=",
      "Fu2021Table.Feature_name"
    )
    .select("*");
}

function searchData(key) {
  return new Promise((resolve, reject) => {
    knex("JoinedTable")
      .where("id", "=", key)
      .select("*")
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
}

function searchGraceV1Image(key) {
  return new Promise((resolve, reject) => {
    knex("GraceV1ImageRelatedTable")
      .where("Feature_name", "=", key)
      .select("GRACE_Plate", "GRACE_Position")
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
}

function searchGraceV2Image(key) {
    return new Promise((resolve, reject) => {
      knex("GraceV2ImageRelatedTable")
        .where("Feature_name", "=", key)
        .select("GRACEv2_Plate", "GRACEv2_Position")
        .then((rows) => resolve(rows))
        .catch((err) => reject(err));
    });
  }

function getGraceV1ImageData(PlateNumber) {
  const normalizedPlateNumber = parseInt(PlateNumber.replace("Plate ", ""), 10);
  return new Promise((resolve, reject) => {
    knex("GraceTable")
      .where({
        PlateNumber: normalizedPlateNumber,
        GraceVersion: 'GRACE',
      })
      .select("DOX", "No_DOX")
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
}

function getGraceV2ImageData(PlateNumber) {
    console.log("knex");
    console.log(PlateNumber);
    const normalizedPlateNumber = parseInt(PlateNumber.replace("Plate ", ""), 10);
    return new Promise((resolve, reject) => {
      knex("GraceTable")
        .where({
          PlateNumber: normalizedPlateNumber,
          GraceVersion: 'GELC',
        })
        .select("DOX", "No_DOX")
        .then((rows) => resolve(rows))
        .catch((err) => reject(err));
    });
  }

module.exports = {
  getAllData,
  JoinData,
  searchData,
  searchGraceV1Image,
  searchGraceV2Image,
  getGraceV1ImageData,
  getGraceV2ImageData,
};
