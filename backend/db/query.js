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

function searchFu2021Data(value) {
  const lowerCaseValue = value.toLowerCase();

  return new Promise((resolve, reject) => {
    knex("Fu2021Table")
      .select("*") // Selects all columns of the matching row
      .whereRaw("LOWER(Feature_name) = ?", [lowerCaseValue])
      .orWhereRaw("LOWER(ORF_ID) = ?", [lowerCaseValue])
      .orWhereRaw("LOWER(Common) = ?", [lowerCaseValue])
      .then((row) => {
        if (row) {
          resolve(row); // Resolves with the whole row if a match is found
        } else {
          resolve("No matching record found");
        }
      })
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

function rf_prediction_score() {
  return new Promise((resolve, reject) => {
    knex("MutantFeatureGenesTable")
      .select("id", "attr17")
      .whereNotNull("attr17") // Exclude null values
      .andWhere("attr17", "!=", "") // Exclude empty strings
      .andWhereRaw("attr17 = attr17") // Exclude NaN values
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
}

function gene_expression_level() {
  return new Promise((resolve, reject) => {
    knex("MutantFeatureGenesTable")
      .select("id", "attr1")
      .whereNotNull("attr1") // Exclude null values
      .andWhere("attr1", "!=", "") // Exclude empty strings
      .andWhereRaw("attr1 = attr1") // Exclude NaN values
      .then((rows) => resolve(rows))
      .catch((err) => reject(err));
  });
}

function searchGI_D05_Table(key) {
  return new Promise((resolve, reject) => {
    knex("GI_D05_Table")
      .where("orf19", key)
      .select("*")
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
}

function searchGI_D10_Table(key) {
  return new Promise((resolve, reject) => {
    knex("GI_D10_Table")
      .where("orf19", key)
      .select("*")
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
}

function searchInVitroTable(key) {
  return new Promise((resolve, reject) => {
    knex("InVitroTable")
      .where("ORF_ID", key)
      .select("*")
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
}

function searchSI_Kinase_Table(key) {
  return new Promise((resolve, reject) => {
    knex("SI_Kinase_Table")
      .where("orf19", key)
      .select("*")
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
}

function searchSI_Table(key) {
  return new Promise((resolve, reject) => {
    knex("SI_Table")
      .where("orf19", key)
      .select("*")
      .then(rows => resolve(rows))
      .catch(err => reject(err));
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
  rf_prediction_score,
  gene_expression_level,
  searchGI_D05_Table,
  searchGI_D10_Table,
  searchInVitroTable,
  searchSI_Kinase_Table,
  searchSI_Table,
};
