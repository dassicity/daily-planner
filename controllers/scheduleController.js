const RedisClient = require("../config/connectRedis");
const web_push = require("web-push");
require("dotenv").config();

const public_key = process.env.PUBLIC_KEY;
const private_key = process.env.PRIVATE_KEY;

web_push.setVapidDetails("mailto:dassic@outlook.com", public_key, private_key);

const createSchedule = async (req, res, next) => {
    try {
        // "schedule" : ["breakfast" , "" , "college" , etc]

        const { schedule, subscription } = req.body;
        await RedisClient.set('schedule', JSON.stringify(schedule));
        await RedisClient.set('subscription', JSON.stringify(subscription));

        const saved_schedule = await RedisClient.get('schedule');
        const saved_subscription = await RedisClient.get('subscription');
        console.log("Schedule --->", saved_schedule);
        console.log("Subscription --->", saved_subscription);

        web_push.sendNotification(subscription, JSON.stringify({
            title: "Soumyanil",
            body: "First push notification"
        }));

        return res.status(200).json({ "message": saved_schedule });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ "message": err });
    }
}

module.exports = { createSchedule };