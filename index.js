const express = require("express");
const logger = require("morgan");
const app = express();

const RedisClient = require("./config/connectRedis");
const ScheduleRoutes = require("./routes/scheduleRoutes");
// require("./services/scheduler");

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