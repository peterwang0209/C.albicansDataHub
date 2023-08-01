const { insertDataFromExcel } = require("./db/insert_mutant_features_genes.js");
const { insertFu2021Data } = require("./db/insert_Fu2021_6638_genes.js");
const { joinTable } = require("./db/join_create_table.js");
const { insertImage } = require("./db/insert_Image.js");
const {
  grace1DataImageRelated,
} = require("./db/c_albicans_GRACE_essentiality_Fu2021.js");
const {
  grace2DataImageRelated,
} = require("./db/c_albicans_GRACEv2_essentiality_Fu2021.js");

// Path
const MutantFeatureGenePath =
  "./data/Calbicans_mutant_features_gene_essentiality.xlsx";
const Fu2021GenePath = "./data/C_albicans_mapped_names_Fu2021_6638_genes.tsv";
const dbFilePath = "./db/database.db";
const graceV1image = "./data/image/GRACE";
const graceV2image = "./data/image/GRACEv2";
const graceV1 = "./data/C_albicans_GRACE_essentiality_Fu2021.tsv";
const graceV2 = "./data/C_albicans_GRACEv2_essentiality_Fu2021.tsv";

// Wrap your app logic into an async function
async function startApp() {
  await insertFu2021Data(Fu2021GenePath, dbFilePath);
  await insertDataFromExcel(MutantFeatureGenePath, dbFilePath);
  await insertImage(graceV1image, dbFilePath);
  await insertImage(graceV2image, dbFilePath);
  await grace1DataImageRelated(graceV1, dbFilePath);
  await grace2DataImageRelated(graceV2, dbFilePath);
}

async function joinTables() {
  await joinTable(dbFilePath);
}

// Call the async function
startApp();
joinTables();
