// index.js
// where your node app starts

// Import dependencies
const express = require("express");
const cors = require("cors");

// Initialize the app
const app = express();

// Enable CORS for FCC testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static("public"));

// Serve the index.html file on the root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API Endpoint: Hello
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// API Endpoint: Timestamp Microservice
app.get("/api/:date?", function (req, res) {
  const { date } = req.params; // Get the date parameter
  let parsedDate;

  // Case 1: No date parameter (return current date)
  if (!date) {
    parsedDate = new Date();
  } 
  // Case 2: UNIX timestamp (number format)
  else if (!isNaN(date)) {
    parsedDate = new Date(parseInt(date));
  } 
  // Case 3: Date string
  else {
    parsedDate = new Date(date);
  }

  // Handle invalid dates
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respond with the timestamp
  res.json({
    unix: parsedDate.getTime(), // Unix timestamp in milliseconds
    utc: parsedDate.toUTCString() // UTC string
  });
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
