// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// :date? --> ? means date can be optional param
app.get("/api/:date?", function (req, res) {
  console.log("Input Format", req.params.date);
  const inputDateParam = req.params.date;
  const timestampPattern = /^\d{13}$/;
  let dateObj = "";
  if (timestampPattern.test(inputDateParam)) {
    console.log("Timestamp Format");
    dateObj = new Date(parseInt(req.params.date));
  } else if (!req.params.date || !req.params.date.trim() === "") {
    console.log("Empty Date");
    dateObj = new Date();
  } else if (!isNaN(new Date(inputDateParam).getTime())) {
    dateObj = new Date(req.params.date);
  }

  if (dateObj === "") {
    res.json({
      error: "Invalid Date",
    });
  } else {
    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString(),
    });
  }
});

// app.get("/api/2015-12-25", function (req, res) {
//   res.json({
//     unix: new Date("2015-12-25").getTime(),
//     utc: new Date("2015-12-25").toUTCString(),
//   });
// });

// app.get("/api/1451001600000", function (req, res) {
//   res.json({
//     unix: 1451001600000,
//     utc: new Date(1451001600000).toUTCString(),
//   });
// });

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
