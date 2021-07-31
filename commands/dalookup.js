var Discord = require('discord.js')

module.exports = {
config: {
    name: "dalookup",
    description: "View previous DA's against a member",
    usage: ".dalookup <@user> || <userid>",
    aliases: ['dasearch']
},
run: async (bot, message, args) => {
    message.delete()
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**You Do Not Have Permissions To Resign Members! - [BAN_MEMBERS]**");
    if (!args[0]) return message.channel.send('**Enter A User To Lookup!**')
    var lookupmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
    var looker = message.author

    const daembed = new Discord.MessageEmbed()
    .setFooter(message.guild.name, message.guild.iconURL())
    .setTimestamp()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`)
    .addField('Previous Counts: ', `3`)
    .addField('Reason: ', `He Smells`)
    .setTitle(`${lookupmember.user.username}'s Disiplinary Action History`)
    message.channel.send('`Ok, one moment while I grab that information...`').then((message) => {
        setTimeout(function() {
            message.edit('`Ok, I\'ve compiled all the information and have sent it in our DM\s!`')
        }, 5000)
        message.delete({timeout: 10000})
        looker.send(daembed)    
    })
}

}