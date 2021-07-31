const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
    config: {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "[name | tag | mention | ID] <reason> (optional)",
        aliases: ["ub", "unbanish"],
    },
    run: async (bot, message, args) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**You Dont Have The Permissions To Unban Someone! - [BAN_MEMBERS]**")

        if (!args[0]) return message.channel.send("**Please Enter A Name!**")
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send("**Please Provide A Valid Username, Tag Or ID Or The User Is Not Banned!**")

        if (!args[1]) return message.reply('**Please provide a reason! | i.e Ban appeal accepted**')

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**I Don't Have Permissions To Unban Someone! - [BAN_MEMBERS]**")
        try {
            if (reason) {
                for (let [, guild] of bot.guilds.cache) {
                    guild.members.unban(bannedMember.user.id, {reason}).catch(() => null)
                }
                var sembed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${bannedMember.user.tag} has been unbanned for ${reason}**`)
                message.channel.send(sembed)
            } else {
                for (let [, guild] of bot.guilds.cache) {
                    guild.members.unban(bannedMember.user.id).catch(() => {})
                }
            var sembed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`**${bannedMember.user.tag} has been unbanned**`)
                message.channel.send(sembed2)
            }
        } catch {
            
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .setColor("#ff0000")
        .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**Moderation**", "Global Unban")
        .addField("**User Unbanned**", `<@${bannedMember.user.id}> (${bannedMember.user.username}#${bannedMember.user.discriminator}) ID: ${bannedMember.user.id}`)
        .addField("**Unban Processed By**", `<@${message.author.id}> \`(${message.author.username}#${message.author.discriminator})\` ID: ${message.author.id}`)
        .addField("**Reason**", `${reason}`)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }
}