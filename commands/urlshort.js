const Discord = require('discord.js')
const lodshortt = require('node-url-shortener');

module.exports = {
    config: {
      name: "urlshort",
      description: "Allows you to shortern a link",
      aliases: ['shortlink', 'shorturl'],
      usage: ['.urlshort <link>']
    },
    run: async (bot, message, args) => {
        message.delete()
        const regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`Please provide a URL you want to shorten!`).setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true })))
        if (!regex.exec(args[0])) return message.channel.send(new Discord.MessageEmbed().setDescription(`Please provide me a valid URL!`).setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true })))
        lodshortt.short(args[0], function(err, url) {
            const embed = new Discord.MessageEmbed()
                .setAuthor("URL Shortener", message.author.displayAvatarURL({ dynamic: true }))
                .addField("Original URL", `[Click Here!](${args[0]})`)
                .addField("Shortened URL", `[Click Here!](${url})`)
                .setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }));
            return message.channel.send(embed);
        })
            }
}