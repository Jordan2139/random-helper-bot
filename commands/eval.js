module.exports = {
    config: {
        name: "eval",
        aliases: ["performcode"],
        category: "moderation",
        description: "Evals code",
        usage: ".eval <code>"
    },

    run: async (bot, message, args) => {        
        if (message.author.id !== '353020749126041602') return message.reply('Ayo there calm down bukaroo. You def can\'t handling using this')
        try {
            eval(`(async () => {${args.join(' ')}})()`)
        } catch { (e).then(e =>  message.channel.send(e))}
        
    }
}
