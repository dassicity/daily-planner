const RedisClient = require("../config/connectRedis");
const { getQuote } = require("../util/randomQuoteGenerator");

// ["0",   "1",   "2",   "3",   "4",   "5",   "6",   "7",   "8"]
// [ 9-10, 10-11, 11-12, 12-13, 13-14, 14-15, 15-16, 16-17, 17-18]

// console.log(">>> HERE <<<");

const sendMessage = async () => {
    try {
        console.log(">>> HERE <<<");
        let date = new Date();
        let minutes = date.getMinutes();
        let hours = date.getHours();

        const schedule = await RedisClient.get('schedule');
        const parsedSchedule = JSON.parse(schedule);

        const index = hours - 9;


        console.log(hours, " : ", minutes);

        if (minutes == 30) {
            const quote = getQuote();
            console.log(quote);
            // res.status(200).json({ "message": quote });
        }
        else {
            if (index >= 1) {
                const message = `Start with you next task ${parsedSchedule[index]}. Have you finished your previous task ${parsedSchedule[index - 1]} ?`;
                console.log(message);
                // res.status(200).json({ "message": `Start with you next task ${parsedSchedule[index]}. Have you finished your previous task ${schedule[index - 1]} ?` });
            }
            else if (index === 0) {
                const message = `Start your day with ${parsedSchedule[index]}. A fresh start !`;
                console.log(message);
                // res.status(200).json({ "message": `Start your day with ${parsedSchedule[index]}. A fresh start !` });
            }

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": error });
    }
}

module.exports = { sendMessage };