const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const { measureMemory } = require("vm");

module.exports = {
    config: {
        name: "bubblewrap",
        aliases: ['bw'],
        usage: ".bubblewrap",
        description: 'Pop some bubble wrap'
    },

    run: async(bot, message, args) => {
        message.delete()
        message.channel.send(`Here is some of the finest bubblewrap, enjoy popping!\n\n${(`${'||pop||'.repeat(10)}\n`).repeat(15)}`)    }
}