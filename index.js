const mineflayer = require('mineflayer')
const fs = require('node:fs')

const output = fs.createWriteStream('./logs/chatlog.log')
const myConsole = new console.Console(output)

require('console-stamp')(myConsole, {
    stdout: output,
    format: ':date(HH:MM:ss)'
})

var defaultRegEx = new RegExp("[^>]+")

if (process.argv.length > 4) {
    console.log('Usage : node example.js [<host>] [<port>]')
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
    version: '1.20',
    hideErrors: false
})

bot.once('inject_allowed', () => {
    global.console.log = bot.dashboard.log
    global.console.error = bot.dashboard.log
})

bot.loadPlugin(require('mineflayer-dashboard')({
    chatPattern: defaultRegEx
}))


bot.on("chat", (username, message) => {
    myConsole.log(`[${username}] ${message}`);
})
