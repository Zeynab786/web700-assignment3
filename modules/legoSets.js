const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

class LegoData {
  initialize() {
    return new Promise((resolve, reject) => {
      if (setData.length && themeData.length) {
        this.sets = setData;
        this.themes = themeData;
        resolve();
      } else {
        reject("Data not loaded properly.");
      }
    });
  }

  getAllSets() {
    return Promise.resolve(this.sets);
  }

  getSetByNum(setNum) {
    const result = this.sets.find(set => set.set_num === setNum);
    return result ? Promise.resolve(result) : Promise.reject("Set not found");
  }

  getSetsByTheme(theme) {
  const filtered = this.sets.filter(set => 
    typeof set.theme === 'string' && 
    set.theme.toLowerCase().includes(theme.toLowerCase())
  );
  return filtered.length ? Promise.resolve(filtered) : Promise.reject("Theme not found");
}

}

module.exports = LegoData;
