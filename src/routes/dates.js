// api.js - API route module.

const express = require("express");
const router = express.Router();
const dates = require("../controllers/dates");

const getUnixTimeFromDate = (date) => date.getTime() / 1000;

router.get("/", (req, res) => {
  const date = new Date();
  res.json({
    unix: getUnixTimeFromDate(date),
    utc: date.toUTCString(),
  });
});

router.get("/:date", (req, res) => {
  let date;
  try {
    if (!isNaN(req.params.date)) {
      date = new Date(Number(req.params.date));
    } else {
      date = new Date(req.params.date);
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: "Invalid Date",
    });
  }
  res.json({
    unix: date.getTime() / 1000,
    utc: date.toUTCString(),
  });
});

module.exports = router;
