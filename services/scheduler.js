const scheduler = require("node-cron");

const { sendMessage } = require("../controllers/sendMessage");


// console.log(">>> HERE <<<");

const options = {
    scheduled: false,
    timezone: "Asia/Kolkata"
}

const job = scheduler.schedule("* * * * *", sendMessage, options);
// console.log(">>> HERE <<<");
job.start();

scheduler.schedule("0 9 * * *", () => {
    job.start();
});

scheduler.schedule("30 20 * * *", () => {
    job.stop();
});