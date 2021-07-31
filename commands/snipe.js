const Discord = require('discord.js')
module.exports = {
    config: {
      name: "snipe",
      description: "Gets a users last message",
      aliases: ['lastm'],
      usage: ['.snipe']
    },
    run: async (bot, message, args) => {
        const msg = bot.snipes.get(message.channel.id)
        if (!msg) return message.reply('That user hasn\'t deleted any messages!')
        
        const snipeEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setAuthor(msg.author, msg.member.user.displayAvatarURL())
            .setTitle(`Sniped The Message!`)
            .setDescription(`\`\`\`${msg.content}\`\`\``)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(snipeEmbed)
        }
}