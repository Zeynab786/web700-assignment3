/********************************************************************************
*  WEB700 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Zeinab Mohamed Student ID: 123970246 Date: 12th June 2025
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/

const express = require("express");
const path = require("path");
const LegoData = require("./modules/legoSets");
const legoData = new LegoData();

const app = express();
const HTTP_PORT = process.env.PORT || 3000;

// Serve static files (like CSS if needed)
app.use(express.static(path.join(__dirname, "views")));

// Route: Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Route: About Page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Route: Get all sets or filter by theme
app.get("/lego/sets", (req, res) => {
  const theme = req.query.theme;
  try {
    const sets = legoData.getAllSets(theme);
    res.json(sets);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Route: Get a specific set by set_num
app.get("/lego/sets/:set_num", (req, res) => {
  const setNum = req.params.set_num;
  try {
    const set = legoData.getSetByNum(setNum);
    res.json(set);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Custom 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Initialize and start the server
legoData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server is listening on port ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize data: ", err);
  });