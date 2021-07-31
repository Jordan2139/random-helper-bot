var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../config")
const db = require('quick.db')
const paginationEmbed = require('discord.js-pagination')

module.exports = {
config: {
    name: "commands",
    description: "List of Commands",
    usage: ".commands",
    example: ".commands",
    aliases: ['c']
},
run: async (bot, message, args) => {
    message.delete()
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    const embed1 = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL())
    .setFooter(message.guild.name, message.guild.iconURL())
    .setTitle(`Welcome to the commands menu!`)
    .setDescription('If you simply use the correct reactions below you will be able to see all the commands my creator has given me!')
    .setImage(bot.user.displayAvatarURL())

    const embed2 = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL())
    .setFooter(message.guild.name, message.guild.iconURL())
    .setTitle(`Here is the full list of my commands!`)
    fs.readdir('./commands/', (err, files) => {
        embed2.setDescription(`My developer has graciously given me **${files.length}** commands!\nIf you simply use the correct reactions below you will be able to see all the commands my creator has given me!`)
    })

    const embed3 = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL())
    .setFooter(message.guild.name, message.guild.iconURL())
    .setTitle(`Here is the full list of my commands continued!`)


    pages = [
        embed1,
        embed2,
        embed3
    ];
  
    for (let [, command] of bot.commands) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL())
        .setFooter(message.guild.name, message.guild.iconURL())
        .setThumbnail(bot.user.displayAvatarURL())
        .setTitle(bot.user.username)
        .addField("Name:", command.config.name)
        .addField('Aliases:', command.config.aliases)
        .addField('Description:', command.config.description)
        .addField('Usage:', command.config.usage)
        .setTimestamp()
        .setColor(Math.floor(Math.random()*16777215))
        pages.push(embed)
    }
    runloop = 1
    i = 0
    for (let [, command] of bot.commands) {
        if (i < 25) {
            runloop ++
            embed2.addField(command.config.name, `${command.config.description}`, true) // do this one 25 times
        } else {
            embed3.addField(command.config.name, `${command.config.description}`, true) // do this for the rest of the times
        }
        // _G['embed' + runloop]
        // .addField(command.config.name, `${command.config.description}`, true) // do this one 25 times
        // .addField(command.config.name, `${command.config.description}`, true) // do this for the rest of the times
        i ++
    }


    emojiList = ['⏪', '⏩'];
    timeout = ['300000'];

    paginationEmbed(message, pages, emojiList, timeout);


}

}