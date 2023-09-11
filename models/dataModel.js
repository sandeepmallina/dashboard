const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: Date,
    published: Date,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number,
  },
  { collection: "variables" }
);

const DataModel = mongoose.model("Data", dataSchema); // 'Data' is the model name, 'variables' is the collection name

module.exports = DataModel;
