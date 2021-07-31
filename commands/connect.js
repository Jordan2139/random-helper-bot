const figlet = require('figlet')
const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    config: {
        name: "connect",
        aliases: ['connectserver'],
        usage: ".connect",
        description: 'Get a direct connect link to the server'
    },

    run: async(bot, message, args) => {
        message.delete()
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**You Dont Have Permmissions To Get The Server IP! - [MANAGE_GUILD]**");


        const embedexpired = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor('Connect To RSRP Server 1!', message.guild.iconURL())
        .setDescription('`This connect link has expired!`')
        .setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }));

        const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor('Connect To RSRP Server 1!', message.guild.iconURL())
        .addField('Quick Connect', '[Connect Here!](https://cfx.re/join/5ljzx6)')
        .setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }));
    message.channel.send(embed).then((message) => {
        setTimeout(function(){
        message.edit(embedexpired)
        }, 30000)
    })
    


    const channel  = db.fetch(`modlog_${message.guild.id}`);
    if (!channel) return;
    const logembed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
    .setColor("GREEN")
    .setFooter(message.guild.name, message.guild.iconURL())
    .addField("**Action**", "Connect Link Requested")
    .addField("**Connect Link Requested By**", `<@${message.author.id}> \`(${message.author.username}#${message.author.discriminator})\` ID: ${message.author.id}`)
    .addField("**Date**", message.createdAt.toLocaleString())
    .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel)
    if (!sChannel) return;
    sChannel.send(logembed)

    }
}