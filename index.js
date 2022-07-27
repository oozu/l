
const Discord = require('discord.js');
const config = require("./config.json");
const respuestas = require("./respuestas.json");

const client = new Discord.client()
const prefix = '!'

client.on('ready', ()=> {
    console.log("arrancado");
});

client.on('message', (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWhit(prefix)) return;

    const command = message.content.slice(prefix.length);

    if (command === "insulta") {
        let randomIndex = Math.floor(Math.random() * respuestas.RESPUESTAS.length);
        let respuestas = respuestas.RESPUESTAS[randomIndex];
        message.channel.send("eres un " + respuesta.toLocaleLowerCase());
    }
});

client.on('voiceStateUpdate', (oldUserChannel, newUserChannel) => {

    if (newUserChannel.member.user.bot !== null && oldUserChannel.channel === null) {
        if (newUserChannel.member.user.bot) return;

        console.log(newUserChannel.channel.name);
        
        if(oldUserChannel.selfDeaf === newUserChannel.selfDeaf
            && oldUserChannel.selfMute === newUserChannel.selfMute) {

                newUserChannel.channel.join().then(connection => {
                    const dispatcher = connection.play("./audio.mp3");
                    dispatcher.on("finish", () => {
                        newUserChannel.channel.leave();
                    });
                }).catch(err => {
                    newUserChannel.channel.leave();
                    console.log(err);
                });
            }
    }
});
client.login(config.BOT_TOKEN)