const db = require("quick.db")

module.exports = {
    config: {
        name: "say",
        aliases: ['repeat', 'speak'],
        usage: ".say <message>",
        description: 'Have the bot repeat what you say'
    },

    run: async(bot, message, args) => {
        message.delete()
        if (message.author.id !== "353020749126041602") return "Whoa there bukaroo! You can't tell me what to do!"
        if (!args[0]) return "What do you want me to say?"
        let mesay = args.slice(0).join(" ")
        message.channel.send(mesay)

    }
}