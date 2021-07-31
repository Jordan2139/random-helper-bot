const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js')
module.exports = {
    config: {
    name: 'ping',
    description: 'Allows you to see the bots ping.',
    aliases: ['pings', 'bping'],
    usage: '.ping'
    }
}

module.exports.run = async (bot, message, args, interaction) => {
    message.delete()
    message.channel.send(`Checking Ping for ${message.guild.name}!`).then(msg3 => {
        message.channel.send(`Ping Results!`).then(msg => {
            const Ping2 = new Discord.MessageEmbed().setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true })).setDescription(
                `Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`)
            msg.edit({ content: '', embed: Ping2 })
            msg3.edit(`Ping results for **${message.guild.name}**!`)
        })
    })
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomID('primary')
        .setLabel('Click Here to See API Latency!')
        .setStyle('PRIMARY')
    );
    await interaction.reply(`API Latency is ${bot.ws.ping}ms`, {components: [row]});

}