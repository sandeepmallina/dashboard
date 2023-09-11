const express = require("express");
const mongoose = require("mongoose");
const DataModel = require("./models/dataModel");
const cors = require("cors");
const app = express();

// Enable CORS for all routes or specify allowed origins
app.use(cors());
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.get("/block", (req, res) => {
//   res.send("Hello World block sandeep");
// });
app.get("/data", async (req, res) => {
  try {
    const data = await DataModel.find({});
    // console.log("Data length:", data.length);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await DataModel.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:admin1234@nodeapi.mymkg3q.mongodb.net/data?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
