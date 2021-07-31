const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const { measureMemory } = require("vm");

module.exports = {
    config: {
        name: "ban",
        aliases: ['forceban'],
        usage: "[ban] <user ID>",
        description: 'Ban players that are not in our server (via ID)'
    },

    run: async(bot, message, args) => {
        if (!message.member.hasPermission("BAN_MAMBERS")) return message.channel.send("**You Dont Have Permmissions To Ban Someone! - [BAN_MEMBERS]**");

        const target = args[0];
        if (isNaN(target)) return message.reply(`Please specify an ID`);

        const reason   = args.splice(1, args.length).join(' ');

            try {
                for (let [, guild] of bot.guilds.cache) {
                    guild.members.ban(target, {reason: reason.length < 1 ? 'No reason supplied.': reason}).catch(() => {})
                }
                const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription("**They were successfully banned. User was not notified!**");
                await message.channel.send(embed2);                
                const channel  = db.fetch(`modlog_${message.guild.id}`);
                if (!channel) return;
            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "Global Ban")
                .addField("**ID**", `${target}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();
  
            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
            
            } catch (error) { console.log(error)}
    }
}