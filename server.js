// Setup empty JS object to act as endpoint for all routes
let projectData = {}; //-> Our virtual database to store the data.
// Require Express to run server and routes
const express = require("express");
const Cors = require("cors");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(Cors());
// Initialize the main project folder
app.use(express.static("website")); //-> Used to link the front-end to the back-end.

// Setup Server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`the server is running on http://localhost:${PORT}`); //-> Checking if the server is running.
});
//getting data from the server
app.get("/getData", (req, res) => {
  res.send(projectData);
});
//posting data to the server
app.post("/postData", (req, res) => {
  projectData = req.body;
  res.send({ message: `THE DATA HAS BEEN SENT SUCCESSFULLY!` }); //-> To make sure the data has been sent.
});
