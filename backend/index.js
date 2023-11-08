const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const db = require("./db/query");
const port = 8804;

const corsOptions = {
  origin: [
    "http://www.candidaphenome.org",
    "https://www.candidaphenome.org",
    "http://localhost:8803",
    "http://localhost:8804",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the Vue app
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/alldata", async (req, res) => {
  const joinedData = await db.JoinData();
  res.status(200).json({ joinedData });
});

async function get_FeatureName(type, value) {
  const fu2021Data = await db.searchFu2021Data(type, value);
  // console.log("get_FeatureName");
  // console.log(fu2021Data[0].Feature_name);
  return fu2021Data[0].Feature_name;
}

// Endpoint for Fu2021Data
app.get("/search/fu2021", async (req, res) => {
  console.log("visited /search/fu2021");
  const { term, type } = req.query;
  const value = decodeURIComponent(term.replace("%2E", "."));
  const fu2021Data = await db.searchFu2021Data(type, value);
  const output = {
    data: fu2021Data,
    stats: {},
  };
  res.json(output);
});

// Endpoint for MutantFeatureGenesData
app.get("/search/mutant", async (req, res) => {
  const { term, type } = req.query;
  const value = decodeURIComponent(term.replace("%2E", "."));
  const feature_name = await get_FeatureName(type, value);
  // console.log("mutant feature name", feature_name);
  const mutantData = await db.searchMutantFeatureGenesData(feature_name);
  // console.log(mutantData);
  const gene_expression_level = await db.gene_expression_level();
  const output = {
    data: mutantData,
    stats: {
      geneExpressionLevel: gene_expression_level,
    },
  };
  res.json(output);
});

// Endpoint for GraceV1
app.get("/search/gracev1", async (req, res) => {
  const { term, type } = req.query;
  const value = decodeURIComponent(term.replace("%2E", "."));
  const feature_name = await get_FeatureName(type, value);
  const gracev1data = await db.searchGraceV1Data(feature_name);
  var graceV1ImageResultsWithData;
  const graceV1ImageResults = await db.searchGraceV1Image(feature_name);
  if (graceV1ImageResults) {
    graceV1ImageResultsWithData = await Promise.all(
      graceV1ImageResults.map(async (result) => {
        const imageData = await db.getGraceV1ImageData(result.GRACE_Plate); // replace 'GraceV1' with actual GraceVersion if necessary
        return {
          ...result,
          imageData,
        };
      })
    );
  }
  const allGrace1Results = {
    gracev1data,
    graceV1ImageSelections: graceV1ImageResultsWithData,
  };
  res.json(allGrace1Results);
});

// Endpoint for GraceV2
app.get("/search/gracev2", async (req, res) => {
  const { term, type } = req.query;
  const value = decodeURIComponent(term.replace("%2E", "."));
  const feature_name = await get_FeatureName(type, value);
  const gracev2data = await db.searchGraceV2Data(feature_name);
  var graceV2ImageResultsWithData;
  const graceV2ImageResults = await db.searchGraceV2Image(feature_name);
  if (graceV2ImageResults) {
    graceV2ImageResultsWithData = await Promise.all(
      graceV2ImageResults.map(async (result) => {
        const imageData = await db.getGraceV2ImageData(result.GRACEv2_Plate); // replace 'GraceV1' with actual GraceVersion if necessary
        return {
          ...result,
          imageData,
        };
      })
    );
  }
  const allGrace2Results = {
    gracev2data,
    graceV2ImageSelections: graceV2ImageResultsWithData,
  };
  res.json(allGrace2Results);
});

// Assuming 'db.fetchAllFeedback' is a function that returns all feedback from your database
app.get("/feedback", async (req, res) => {
  console.log("Reached GET /feedback");
  try {
    const allFeedback = await db.fetchAllFeedback();
    res.status(200).json(allFeedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/feedback", async (req, res) => {
  const { content, category } = req.body;
  console.log("reach backend feedback");
  try {
    console.log("try block in feedback");
    // Insert the feedback into the database
    await db.insertFeedback(content, category);

    // Fetch all feedback
    const allFeedback = await db.fetchAllFeedback();

    res.status(200).json(allFeedback);
  } catch (error) {
    console.error("Error processing feedback:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Handle SPA fallback, so any other routes will redirect to the index.html of Vue
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
