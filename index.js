const express = require("express");
const logger = require("morgan");
const cors = require("cors")
const app = express();

require("dotenv").config();

require("./services/scheduler");
const RedisClient = require("./config/connectRedis");
const ScheduleRoutes = require("./routes/scheduleRoutes");


const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(logger("dev"));

app.use("/api/v1/schedule", ScheduleRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT -", PORT);
    RedisClient.connect()
        .then(() => {
            console.log("Connected to Redis");
        })
        .catch((err) => {
            console.log(err);
        })
});