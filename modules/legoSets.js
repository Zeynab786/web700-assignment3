// Load the Lego data from the JSON files
const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

// Define the LegoData class
class LegoData {
  constructor() {
    this.sets = [];
    this.themes = [];
  }

  // Load data into the class
  async initialize() {
    try {
      this.sets = setData;
      this.themes = themeData;
    } catch (err) {
      throw new Error("Unable to load LEGO data: " + err);
    }
  }

  // Return all sets, or filtered by theme
  getAllSets(theme) {
    if (!theme) {
      return this.sets;
    }

    const foundTheme = this.themes.find(
      (t) => t.name.toLowerCase() === theme.toLowerCase()
    );

    if (!foundTheme) {
      throw new Error(`Theme '${theme}' not found.`);
    }

    return this.sets.filter((set) => set.theme_id === foundTheme.id);
  }

  // Return a specific set by set_num
  getSetByNum(setNum) {
    const foundSet = this.sets.find((set) => set.set_num === setNum);
    if (!foundSet) {
      throw new Error(`Set '${setNum}' not found.`);
    }
    return foundSet;
  }
}

// Export the module
module.exports = LegoData;
