const db = require("quick.db")
const Discord = require('discord.js')

module.exports = {
    config: {
        name: "sayem",
        aliases: ['repeat', 'speak'],
        usage: ".sayem <message>",
        description: 'Have the bot repeat what you say'
    },

    run: async(bot, message, args) => {
        message.delete()
        // if (message.author.id !== "353020749126041602") return "Whoa there bukaroo! You can't tell me what to do!"
        if (!args[0]) return "What do you want me to say?"
        let mesay = new Discord.MessageEmbed()
        mesay.setAuthor(`New Message From: ${message.author.username}`, message.guild.iconURL())
        mesay.setColor('BLUE')
        mesay.setFooter(`Rocket Development`, message.guild.iconURL())
        mesay.setDescription(args.slice(0).join(" "))
        message.channel.send(mesay)

    }
}