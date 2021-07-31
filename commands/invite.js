const Discord = require('discord.js')
const db = require('quick.db')
module.exports = {
    config: {
    name: 'invite',
    description: 'Allows you to see the permanent server invite.',
    aliases: ['invlink', 'invitelnk'],
    usage: '.invite'
    }
}

module.exports.run = async(bot, message, args) => {
    message.delete()

    let invite = await message.channel.createInvite(
        {
          maxAge: 300, // maximum time for the invite, in milliseconds
          maxUses: 1, // maximum times it can be used
          unique: true,
          reason: `TrollGuard`
        })

    const embed = new Discord.MessageEmbed()
        .setTitle(`Servers Invite Link!`)
        .setColor("GREEN")
        .setAuthor('This invite link is good for 1 invite and will be active for 5 minutes', message.guild.iconURL())
        .setDescription(invite)
        .setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }));
    message.channel.send(embed)


    const channel  = db.fetch(`modlog_${message.guild.id}`);
    if (!channel) return;
    const logembed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
    .setColor("GREEN")
    .setFooter(message.guild.name, message.guild.iconURL())
    .addField("**Action**", "Invite Requested")
    .addField("**Invite Requested By**", `<@${message.author.id}> \`(${message.author.username}#${message.author.discriminator})\` ID: ${message.author.id}`)
    .addField("**Invite Link:**", invite)
    .addField("**Date**", message.createdAt.toLocaleString())
    .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel)
    if (!sChannel) return;
    sChannel.send(logembed)

}