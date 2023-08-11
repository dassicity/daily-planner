const RedisClient = require("../config/connectRedis");

const sendMessage = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": error });
    }
}

module.exports = sendMessage;