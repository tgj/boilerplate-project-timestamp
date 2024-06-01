// api.js - API route module.

const express = require("express");
const router = express.Router();
const dates = require("../controllers/dates");

const createDateResponse = (date) => ({
  unix: date.getTime(),
  utc: date.toUTCString(),
});

router.get("/", (req, res) => {
  res.json(createDateResponse(new Date()));
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
  res.json(createDateResponse(date));
});

module.exports = router;
