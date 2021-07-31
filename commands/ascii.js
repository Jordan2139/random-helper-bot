const figlet = require('figlet')
const Discord = require('discord.js')

module.exports = {
    config: {
        name: "ascii",
        aliases: ['art'],
        usage: ".ascii <text>",
        description: 'Turn text into ASCII art'
    },

    run: async(bot, message, args) => {
        message.delete()
        if (!args[0]) return message.channel.send('Please provide me with something to turn into art!')
        figlet.text(args.join(' '), (err, data) => {
            if (err) return
            if (data.length > 2000)
                return message.channel.send(new Discord.MessageEmbed().setDescription(`Sorry please provide a text shorter than 2000 charachters!`).setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true })))
            message.channel.send('```\n' + data + '```')
        })    
    }
}