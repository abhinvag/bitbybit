var colors = require("colors");

function log(err, functionName) {
  console.log("Error:".brightRed, err);
  console.log("Function Name:".brightGreen, functionName);
}

const handleInternalError = (req, res, err, functionName) => {
  log(err, functionName);
  return res.status(500).send(err);
};

const handleDatabaseError = (req, res, err, functionName) => {
  log(err, functionName);
  return res.status(400).send(err);
};

module.exports = {
  handleInternalError,
  handleDatabaseError,
};
