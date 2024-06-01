// api.js - API route module.

const express = require("express");
const router = express.Router();
const dates = require("../controllers/dates");

const createDateResponse = (date) => ({
  unix: date.getTime(),
  utc: date.toUTCString(),
});

router.get("/:date", (req, res) => {
  let date;
  const paramIsNumeric = !isNaN(req.params.date);
  if (paramIsNumeric) {
    date = new Date(Number(req.params.date));
  } else {
    date = new Date(req.params.date);
  }
  const dateIsValid = !isNaN(date);
  if (dateIsValid) {
    res.json(createDateResponse(date));
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});

router.get("/", (req, res) => {
  res.json(createDateResponse(new Date()));
});

module.exports = router;
