const express = require("express");
const bodyParser = require('body-parser');
const cors = require ('cors');
const router = express.Router();

// Home page - Dashboard.
router.get("/", function (req, res) {
  res.render("pages/dashboard", {
    name: process.env.NAME,
    dashboardTitle: process.env.DASHBOARD_TITLE,
  });
});

module.exports = router;
