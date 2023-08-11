const express = require("express");
const logger = require("morgan");
const app = express();

require("./services/scheduler");
const RedisClient = require("./config/connectRedis");
const ScheduleRoutes = require("./routes/scheduleRoutes");

const PORT = 1400;

app.use(express.json());
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