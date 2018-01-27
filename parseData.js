var fs = require("fs");

function getBathrooms(){
  console.log("\n *STARTING* \n");
  // Get content from file
  var contents = fs.readFileSync("bathrooms.json");
  // Define to JSON type
  var jsonContent = JSON.parse(contents);

  return jsonContent;
}

module.exports = {
  getBathrooms: getBathrooms
}
