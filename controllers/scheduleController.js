const RedisClient = require("../config/connectRedis");

const createSchedule = async (req, res, next) => {
    try {
        // "schedule" : ["breakfast" , "" , "college" , etc]

        const { schedule } = req.body;
        await RedisClient.set('schedule', JSON.stringify(schedule));
        const savedSchedule = await RedisClient.get('schedule');
        console.log(savedSchedule);

        return res.status(200).json({ "message": savedSchedule });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ "message": err });
    }
}

module.exports = { createSchedule };