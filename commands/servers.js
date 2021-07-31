const { ownerID } = require("../owner.json")
const Discord = require('discord.js')
const paginationEmbed = require('discord.js-pagination');



function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};


module.exports = {
    config: {
          name: "servers",
          description: "Shows the servers the bot is in",
          usage: ".servers",
          example: ".servers",
          aliases: ['botservers'],  
        
},
  run: async (bot, message, args) => {

    let region = {
        "brazil": "Brazil",
        "eu-central": "Central Europe",
        "singapore": "Singapore",
        "us-central": "U.S. Central",
        "sydney": "Sydney",
        "us-east": "U.S. East",
        "us-south": "U.S. South",
        "us-west": "U.S. West",
        "eu-west": "Western Europe",
        "vip-us-east": "VIP U.S. East",
        "london": "London",
        "amsterdam": "Amsterdam",
        "hongkong": "Hong Kong"
    };


    const embed1 = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL())
    .setFooter(message.guild.name, message.guild.iconURL())
    .setTitle(`I am in ${bot.guilds.cache.size} servers and counting!`)
    .setDescription('If you simply use the correct reactions below you will be able to see all the servers I am in along with some info about them!')

    pages = [
        embed1
    ];
  
    for (let [, guild] of bot.guilds.cache) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL())
        .setFooter(guild.name, guild.iconURL())
        .setThumbnail(guild.iconURL())
        .setTitle(guild.name)
        .setTimestamp()
        .addField("Created", `${guild.createdAt.toString().substr(0, 15)},\n(${checkDays(guild.createdAt)})`, true)
        .addField("ID", guild.id, true)
        .addField("Owner", `${guild.owner.user.username}#${guild.owner.user.discriminator}`, true)
        .addField("Region", region[guild.region], true)
        .addField("User Count", guild.memberCount, true)
        .addField("Member Count", guild.members.cache.filter(m => !m.user.bot).size, true)
        .addField("Bot Count", guild.members.cache.filter(m => m.user.bot).size, true)
        .addField("AFK Timeout", guild.afkTimeout / 60 + ' minutes', true)
        .addField("Roles", guild.roles.cache.size, true)
        .addField("Channels", guild.channels.cache.size, true)
        .setColor(Math.floor(Math.random()*16777215))
        pages.push(embed)
    }


    emojiList = ['⏪', '⏩'];
    timeout = ['300000'];

    paginationEmbed(message, pages, emojiList, timeout);

  },
};