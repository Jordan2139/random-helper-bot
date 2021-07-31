const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    config: {
        name: "resign",
        category: "moderation",
        description: "Resign the user (must be in the guild)",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        aliases: ["resignmember"],
    },
    run: async (bot, message, args) => {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**You Do Not Have Permissions To Resign Members! - [BAN_MEMBERS]**");
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("**I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**");

            if (!args[0]) return message.channel.send('**Enter A User To Resign!**')

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send("**User Is Not In The Guild!**");

            if (kickMember.id === message.member.id) return message.channel.send("**You Cannot Resign Yourself!**")

            if (!kickMember.bannable) return message.channel.send("**Cannot Remove This User!**")
            if (kickMember.user.bot) return message.channel.send("**Cannot Remove A Bot!**")
            if (!args[1]) return message.reply('**Please provide a reason!');

            var reason = args.slice(1).join(" ");
             try {
                const memberkick = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**You have been removed from Riverside Roleplay - ${reason}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                    kickMember.send(memberkick).then(() => {
                    for (let [, guild] of bot.guilds.cache) {
                        if (guild.id === "833089687257743380") continue
                        guild.members.ban(kickMember.id, {reason}).catch(() => {})
                    }
                })
            
             } catch {
                 message.reply('**:x: Sorry I had an issue kicking them. Please make sure I have permissions! :x:**')
             }
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** has been removed for ${reason}`)
            message.channel.send(sembed);
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "Removal/ Resignation")
                .addField("**User Removed**", `<@${kickMember.id}> (${kickMember.user.username}#${kickMember.user.discriminator}) ID: ${kickMember.id}`)
                .addField("**Removal Processed By**", `<@${message.author.id}> \`(${message.author.username}#${message.author.discriminator})\` ID: ${message.author.id}`)
                .addField("**Reason**", `${reason}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}