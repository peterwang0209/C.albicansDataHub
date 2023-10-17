fs = require('fs');
const { insertDataFromExcel } = require("./insert_mutant_features_genes.js");
const { insertFu2021Data } = require("./insert_Fu2021_6638_genes.js");
const { joinTable } = require("./join_create_table.js");
const { insertImage } = require("./insert_Image.js");
const {
  grace1DataImageRelated,
} = require("./c_albicans_GRACE_essentiality_Fu2021.js");
const {
  grace2DataImageRelated,
} = require("./c_albicans_GRACEv2_essentiality_Fu2021.js");


function createDBFile(filename) {
  fs.open(filename,'r',function(err, fd){
    if (!err) {
      fs.unlink(filename, (err) => {
        if (err) {
          console.error(`Error deleting file ${filename}:`, err);
        } else {
          console.log(`The file ${filename} was deleted, a new one will be created.`);
          fs.open(filename, 'w', (err) => {
            if (err) {
              console.error(`Error creating new file ${filename}:`, err);
            } else {
              console.log(`The new file ${filename} was created!`);
            }
          });
        }
      });
    } else {
      fs.open(filename, 'w', (err) => {
        if (err) {
          console.error(`Error creating file ${filename}:`, err);
        } else {
          console.log(`The file ${filename} was created!`);
        }
      });
    }
  });
}

// Call the async function

// Path
const MutantFeatureGenePath =
  "../data/Calbicans_mutant_features_gene_essentiality.xlsx";
const Fu2021GenePath = "../data/C_albicans_mapped_names_Fu2021_6638_genes.tsv";
const dbFilePath = "./database.db";
const graceV1image = "../data/image/GRACE";
const graceV2image = "../data/image/GRACEv2";
const graceV1 = "../data/C_albicans_GRACE_essentiality_Fu2021.tsv";
const graceV2 = "../data/C_albicans_GRACEv2_essentiality_Fu2021.tsv";

// Wrap your app logic into an async function
async function startApp() {
  try {
    await createDBFile('database.db');
  } catch (error) {
    console.error('Error creating DB file:', error);
    return;
  }

  try {
    await insertFu2021Data(Fu2021GenePath, dbFilePath);
    console.log('FU2021 Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting Fu2021 Data:', error);
    return;
  }

  try {
    await insertDataFromExcel(MutantFeatureGenePath, dbFilePath);
  } catch (error) {
    console.error('Error inserting data from Excel:', error);
    return;
  }

  try {
    await insertImage(graceV1image, dbFilePath);
    console.log('Grace Image inserted successfully.');
  } catch (error) {
    console.error('Error inserting Grace Image:', error);
    return;
  }

  try {
    await insertImage(graceV2image, dbFilePath);
    console.log('Grace Image inserted successfully.');
  } catch (error) {
    console.error('Error inserting Grace Image:', error);
    return;
  }

  try {
    await grace1DataImageRelated(graceV1, dbFilePath);
  } catch (error) {
    console.error('Error inserting Grace 1 Data Image Related:', error);
    return;
  }

  try {
    await grace2DataImageRelated(graceV2, dbFilePath);
  } catch (error) {
    console.error('Error inserting Grace 2 Data Image Related:', error);
    return;
  }

  try {
    console.log('############################################')
    console.log('############################################')
    console.log('############################################')
    console.log('############################################')
    console.log('############################################')
    await joinTable(dbFilePath); // ensure joinTables is defined before calling startApp
  } catch (error) {
    console.error('Error joining tables:', error);
    return;
  }
}

startApp().catch((error) => {
  console.error("An error occurred:", error);
});
