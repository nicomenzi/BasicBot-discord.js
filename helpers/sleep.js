const { setTimeout } = require("discord.js")

exports.sleep = async => (seconds) => {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}