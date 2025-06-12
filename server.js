const express = require("express");
const path = require("path");
const LegoData = require("./modules/legoSets");

const app = express();
const legoData = new LegoData();

// Serve static files from "views"
app.use(express.static(path.join(__dirname, "views")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/lego/sets", (req, res) => {
  const theme = req.query.theme;
  try {
    const sets = legoData.getAllSets(theme);
    res.json(sets);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get("/lego/sets/:set_num", (req, res) => {
  try {
    const set = legoData.getSetByNum(req.params.set_num);
    res.json(set);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Prepare the server for export (no app.listen here!)
legoData.initialize()
  .then(() => {
    console.log("Lego data initialized successfully");
  })
  .catch((err) => {
    console.error("Failed to initialize lego data:", err);
  });

module.exports = app; // <-- This line is required for Vercel
