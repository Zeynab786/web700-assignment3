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
*  Published URL: ________________
********************************************************************************/

const express = require("express");
const path = require("path");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

const LegoData = require("./modules/legoSets");
const legoData = new LegoData();

// Serve static files from views folder
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

// GET all sets or sets by theme
app.get("/lego/sets", (req, res) => {
  const theme = req.query.theme;
  if (theme) {
    legoData.getSetsByTheme(theme)
      .then(data => res.json(data))
      .catch(err => res.status(404).json({ message: err }));
  } else {
    legoData.getAllSets()
      .then(data => res.json(data))
      .catch(err => res.status(404).json({ message: err }));
  }
});

// GET set by set_num
app.get("/lego/sets/:set_num", (req, res) => {
  legoData.getSetByNum(req.params.set_num)
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: err }));
});

// Custom 404 Page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

// Start server only if data initialized
legoData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server running at http://localhost:${HTTP_PORT}`);
    });
  })
  .catch(err => {
    console.log("Error initializing data:", err);
  });
