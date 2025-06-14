/********************************************************************************
*  WEB700 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Zeinab Mohamed      Student ID: 123970246      Date: 14th June 2025
*
*  Published URL: https://web700-a3-winter-2025.vercel.app
*
********************************************************************************/

const express = require("express");
const path = require("path");

const LegoData = require("./modules/legoSets");
const legoData = new LegoData();

const app = express();

const HTTP_PORT = process.env.PORT || 8080;  // For Vercel or local

// Serve static files in views folder for home/about/404 pages
app.use(express.static(path.join(__dirname, "views")));

// Route for Home Page - serve home.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Route for About Page - serve about.html
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Route to get Lego sets - optionally filtered by ?theme=
app.get("/lego/sets", async (req, res) => {
  try {
    const theme = req.query.theme;

    if (theme) {
      const filteredSets = await legoData.getSetsByTheme(theme);
      if (filteredSets.length === 0) {
        // No sets found for theme
        res.status(404).json({ message: `No Lego sets found for theme '${theme}'` });
      } else {
        res.json(filteredSets);
      }
    } else {
      // Return all sets
      const allSets = await legoData.getAllSets();
      res.json(allSets);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Route to get a single Lego set by set_num
app.get("/lego/sets/:set_num", async (req, res) => {
  try {
    const setNum = req.params.set_num;
    const set = await legoData.getSetByNum(setNum);

    if (!set) {
      res.status(404).json({ message: `No Lego set found with set number '${setNum}'` });
    } else {
      res.json(set);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Custom 404 handler - serve 404.html with status 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Initialize LegoData and start server
legoData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on port ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize LegoData:", err);
  });
