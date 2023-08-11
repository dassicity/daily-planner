const Router = require("express").Router();
const { createSchedule } = require("../controllers/scheduleController");

Router.route("/").post(createSchedule);

module.exports = Router;