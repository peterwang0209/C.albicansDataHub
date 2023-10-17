const knex = require("./knex");

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

function searchFu2021Data(key, value) {
  return new Promise((resolve, reject) => {
    knex("Fu2021Table")
      .where(key, "=", value)
      .select("*")
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
}

function searchMutantFeatureGenesData(key) {
  return new Promise((resolve, reject) => {
    knex("MutantFeatureGenesTable")
      .where("id", "=", key)
      .select("*")
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
}

function searchGraceV1Data(key) {
  return new Promise((resolve, reject) => {
    knex("GraceV1ImageRelatedTable")
      .where("Feature_name", "=", key)
      .select("*")
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
}

function searchGraceV2Data(key) {
  return new Promise((resolve, reject) => {
    knex("GraceV2ImageRelatedTable")
      .where("Feature_name", "=", key)
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
        GraceVersion: "GRACE",
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
        GraceVersion: "GELC",
      })
      .select("DOX", "No_DOX")
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
}

function fetchAllFeedback() {
  return new Promise((resolve, reject) => {
    knex("BugFeedBackTable")
      .select("*")
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
}

function insertFeedback(content, category) {
  return new Promise((resolve, reject) => {
    knex("BugFeedBackTable")
      .insert({
        content: content,
        category: category,
      })
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

function gene_expression_level() {
  return new Promise((resolve, reject) => {
    knex("MutantFeatureGenesTable")
      .select("id", "attr1")
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
}

module.exports = {
  JoinData,
  searchFu2021Data,
  searchMutantFeatureGenesData,
  searchGraceV1Data,
  searchGraceV2Data,
  searchGraceV1Image,
  searchGraceV2Image,
  getGraceV1ImageData,
  getGraceV2ImageData,
  fetchAllFeedback,
  insertFeedback,
  gene_expression_level,
};
