const Discord = require('discord.js')
const { ownerID } = require('../owner.json') 
const db = require('quick.db')

module.exports = {
    config: {
        name: "dontping",
        aliases: ['dnd'],
        category: "moderation",
        description: "Sets you to anti-ping",
        usage: ".dontping [reason]"
    },
    run: async (bot, message, args) => {
        const dndembed = new Discord.MessageEmbed()
        .setTimestamp()
        .setDescription('Ok! I\'ve set your global status to **Do Not Disturb**')
        .setFooter('Please refrain from pinging this user')
        .setColor('RED')
        .setImage('https://static.vecteezy.com/system/resources/previews/000/087/094/original/vector-vintage-do-not-disturb-poster.jpg')


        const undndembed = new Discord.MessageEmbed()
        .setTimestamp()
        .setDescription('Ok! I\'ve set your global status to **Available**')
        .setFooter('This user is available for pings and dms')
        .setColor("GREEN")
        .setImage('https://i.pinimg.com/originals/90/19/e7/9019e795034a69742c54b51bef92c0f2.jpg')


        if (db.fetch(`dnd_${message.author.id}`) === true) {
            db.set(`dnd_${message.author.id}`, false)
            message.channel.send(undndembed)
        }
    else {
        if (args[0]) {
        db.set(`dnd_${message.author.id}_reason`, args.slice(0).join(" "))
        db.set(`dnd_${message.author.id}`, true)
        dndembed.setDescription(`Ok! I\'ve set your global status to **Do Not Disturb**\n**Custom Message:** ${args.slice(0).join(" ")}`)
        message.channel.send(dndembed)
        }
        else {
        db.set(`dnd_${message.author.id}`, true)
        message.channel.send(dndembed)
        }
    } 
    }
}