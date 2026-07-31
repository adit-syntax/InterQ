const mongoose = require("mongoose")
const dns = require("dns")

try {
    dns.setServers(["8.8.8.8", "1.1.1.1"])
} catch (e) {}

async function connectToDB() {

    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to Database")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectToDB