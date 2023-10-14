const fs = require("fs");

module.exports.writeFile = (name, content) => {
  fs.appendFile(name+".json", JSON.stringify(content), (err) => {
    if (err) {
      console.error(err);
    }
    // done!
  });
};
