const { json } = require("body-parser");
const { insertDataFromExcel } = require("./db/insert_mutant_features_genes.js");
const { insertFu2021Data } = require("./db/insert_Fu2021_6638_genes.js")
const express = require('express')
const app = express()
const cors = require('cors')
const db = require("./db/query")
const port = 8803

// Path
const MutantFeatureGenePath = "./db/Calbicans_mutant_features_gene_essentiality.xlsx";
const Fu2021GenePath = "./db/C_albicans_mapped_names_Fu2021_6638_genes.tsv";
const dbFilePath = "./db/database.db";

app.use(cors())

// Wrap your app logic into an async function
async function startApp() {
  await insertDataFromExcel(MutantFeatureGenePath, dbFilePath);
  await insertFu2021Data(Fu2021GenePath, dbFilePath);
}

// Call the async function
startApp();

app.get('/', async (req, res) => {
    
  const joinedData = await db.JoinData();
  res.status(200).json({ joinedData });
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
