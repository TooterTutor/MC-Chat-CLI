const mineflayer = require('mineflayer')
const fs = require('node:fs')

var defaultRegEx = new RegExp("[^>]+")

if (process.argv.length > 6) {
    console.log('Usage : node example.js [<host>] [<port>] [<name>] [<password>]')
    process.exit(1)
}

const userCredentials = fs.readFileSync("./credentials.json")
const mcAuth = JSON.parse(userCredentials)

const bot = mineflayer.createBot({
    host: process.argv[2] || "",
    port: parseInt(process.argv[3]) || "",
    username: mcAuth.login,
    password: mcAuth.password,
    auth: "microsoft",
    version: '1.20.1',
    hideErrors: false
})

bot.once('inject_allowed', () => {
    global.console.log = bot.dashboard.log
    global.console.error = bot.dashboard.log
})

bot.loadPlugin(require('mineflayer-dashboard')({
    chatPattern: defaultRegEx
}))