const { MessageMentions } = require('discord.js');
const db = require('quick.db');
const { PREFIX } = require('../../config');
const queue2 = new Map();
const queue3 = new Map();
const queue = new Map();
const games = new Map()
const Discord = require('discord.js')

module.exports = async (bot, message) => {
    try {

        if (message.author.bot || message.channel.type === "dm") return;

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }

        if (!message.content.startsWith(prefix))
        if (message.mentions.members.size) {
            for (let [, member] of message.mentions.members) {
                const dndembed = new Discord.MessageEmbed()
                .setFooter('Please refrain from pinging or DMing this user!')
                .setTimestamp()
                .setDescription(`<@${member.id}> is currently in **Do Not Disturb**! \nPlease try contacting them later!`)
                .setImage('https://static.vecteezy.com/system/resources/previews/000/087/094/original/vector-vintage-do-not-disturb-poster.jpg')
                .setColor("RED")
                if (db.fetch(`dnd_${member.id}_reason`))
                 dndembed.setDescription(`<@${member.id}> is currently in **Do Not Disturb**! \nPlease try contacting them later!\n**Message:** ${db.fetch(`dnd_${member.id}_reason`)}`)
                if (db.fetch(`dnd_${member.id}`) === true) return message.channel.send(dndembed)                

            }
    }

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        if (!message.content.startsWith(prefix)) return;

        let ops = {
            queue2: queue2,
            queue: queue,
            queue3: queue3,
            games: games
        }

        var commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
         if (commandfile){
            //  if (message.author.id !== '353020749126041602') return message.channel.send('Sorry but I am just for testing purposes! Please use my counterpart <@833575117538983956> if you\'d like to use a bot!') -- Testing Bot
         let  dis = db.fetch(`${commandfile.config.name}_${message.channel.id}_${message.guild.id}`)
         
         if(!dis) dis = "enabled";
         
         if(dis === "enabled"){
             
            console.log(commandfile)
            
            // if (args[0]) {
            //     embed.spliceFields(0, 1)
            //     embed.addField('**Command:**', `**.${commandfile.config.name} ${args[0]}**`)
            // }
        
            commandfile.run(bot, message, args, ops)

        //     const channel  = db.fetch(`modlog_${message.guild.id}`);
        //     if (!channel) return;
        // const embed = new Discord.MessageEmbed()
        //     .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        //     .setColor("YELLOW")
        //     .setFooter(message.guild.name, message.guild.iconURL())
        //     .setTitle('**Command Ran**')
        //     .addField('**Command:**', `**.${commandfile.config.name}**`)
        //     .addField("**Ran By:**", `<@${message.author.id}> \`(${message.author.username}#${message.author.discriminator})\` ID: ${message.author.id}`)
        //     .addField("**Ran In:**", `<#${message.channel.id}>`)
        //     .setTimestamp();

        //     var sChannel = message.guild.channels.cache.get(channel)
        //     if (!sChannel) return;
        //     sChannel.send(embed)    

            
            
         }
         else{
            return;
         }}

    } catch (e) {
        console.log(e);
    }


}

/*
const db = require('quick.db');
const { PREFIX } = require('../../config');
const queue2 = new Map();
const queue3 = new Map();
const queue = new Map();
const games = new Map()

module.exports = async (bot, message) => {
    try {
        if (message.author.bot || message.channel.type === "dm") return;

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        if (!message.content.startsWith(prefix)) return;

        let ops = {
            queue2: queue2,
            queue: queue,
            queue3: queue3,
            games: games
        }

        var commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
        if (commandfile) commandfile.run(bot, message, args, ops)


    } catch (e) {
        console.log(e);
    }


}
*/
