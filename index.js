//====================================================================================CONSTANTS REQUIRED ON READY=============================================================================================
const { Client, Collection, Intents  } = require('discord.js');
const { PREFIX, TOKEN } = require('./config');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");
const db = require('quick.db');
const Discord = require('discord.js');
//============================================================================================================================================================================================================


//====================================================================================COLLECTIONS REQUIRED ON READY===========================================================================================
bot.commands = new Collection();
bot.aliases = new Collection();

//============================================================================================================================================================================================================



//============================================================================================INITIALIZING====================================================================================================
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = fs.readdirSync("./commands");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

bot.snipes = new Discord.Collection();

//============================================================================================================================================================================================================


//=========================================================================================MENTION SETTINGS===========================================================================================

bot.on('message', async message => {


    let prefix;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        
            } catch {
            prefix = PREFIX
    };
    try {
        if (message.mentions.has(bot.user.id) && !message.content.includes("@everyone") && !message.content.includes("@here")) {
          message.channel.send(`\nMy prefix for \`${message.guild.name}\` is \`${prefix}\` Type \`${prefix}help\` for help`);
          }
          
    } catch {
        return;
    };

});


// bot.on('guildMemberAdd', member => {
//     if (member.guild.id !== '833089687257743380') return
//     memberchannel = member.guild.channel 
// })

// bot.on('guildMemberAdd', async member => {
//     const channel  = db.fetch(`modlog_${member.guild.id}`);
//     if (!channel) return;
//     const guildinvites = await member.guild.fetchInvites()
//     const ei = invites[member.guild.id];
//     invites[member.guild.id] = guildinvites;
//     const invite = guildinvites.find(i => ei.get(i.code).uses < i.uses);
//     const inviter = bot.users.get(invite.inviter.id);

//       const embed = new Discord.MessageEmbed()
//     .setAuthor(`${member.guild.name} Modlogs`, member.guild.iconURL())
//     .setColor("#ff0000")
//     .setFooter(member.guild.name, member.guild.iconURL())
//     .addField("**Event**", "Member Joined")
//     .addField("**Name**", `@<${member.id}> (${member.user.username}#${member.user.discriminator}) ID: ${member.id}`)
//     .addField('**Account Created On**', member.user.createdAt.toLocaleString())
//     .addField("**Invited By**", `<@${inviter.id}> (${inviter.user.username}#${inviter.user.discriminator}) ID: ${inviter.id}`)
//     .addField("**Invite Information:**", `Invite Code: ${invite.code} | Invite Uses: ${invite.uses}`)
//     .addField("**Date**", member.createdAt.toLocaleString())
//     .setTimestamp();

// var sChannel = member.guild.channels.cache.get(channel)
// if (!sChannel) return;
// sChannel.send(embed)
// })

bot.on('guildMemberAdd', member => {
    const lockembed = new Discord.MessageEmbed()
    .setDescription(`${member.guild.name} is currently under a **SERVER-WIDE LOCKDOWN!** Please try joining back a little later!`)
    .setFooter(`${member.guild.name} | Made By: Jordan.#2139`, member.guild.iconURL({ dynamic: true }));
    member.send(lockembed).catch(() => {})
        member.kick().catch(() => {})
    })


bot.on('message', function(message){
  if(message.channel.type === 'dm' && message.author.id !== bot.id){
    const dmbed = new Discord.MessageEmbed()
    .setTitle('New Bot DM!')
    .setFooter('RiverSide Roleplay | Created By: Jordan.#2139', bot.user.displayAvatarURL())
    .addField(`Author:`, `<@${message.author.id}> (${message.author.username}#${message.author.discriminator}) ID: ${message.author.id}`)
    .addField('Message:', `\`\`\`${message.content}\`\`\``)
    .setTimestamp()
    .setColor("#F8AA2A")
    bot.channels.fetch('834443684094541849').then((message) => {
        message.send(dmbed);
    })
  };
})


//============================================================================================================================================================================================================


bot.login(TOKEN);
