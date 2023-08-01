const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/query");
const port = 8804;

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  const joinedData = await db.JoinData();
  res.status(200).json({ joinedData });
});

app.get("/search", async (req, res) => {
  const term = req.query.term;

  // Perform a search in your database using the term
  const results = await db.searchData(term);
  var graceV1ImageResultsWithData;
  // Perform the secondary search
  const graceV1ImageResults = await db.searchGraceV1Image(term);
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
  var graceV2ImageResultsWithData;
  const graceV2ImageResults = await db.searchGraceV2Image(term);
  console.log(graceV2ImageResults);
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

  // Combine the results into a single object
  const allResults = {
    results,
    graceV1ImageSelections: graceV1ImageResultsWithData,
    graceV2ImageSelections: graceV2ImageResultsWithData,
  };

  res.json(allResults);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
