'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();
const token = '';
const http = require('http');

const server = http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end('discord bot activated');
});
const port = process.env.PORT || 8080;
server.listen(port);

const commandMap = require('./command.js');
function callCommand(message){
    const commandName = message.content.split(' ')[0];
    const notFoundCommand = (message) => {        
        return message.reply('sry I dont have any idea.')
            .then(() => false); 
    };
    const calledCommand = commandMap.has(commandName) ? 
        commandMap.get(commandName) : notFoundCommand;
    calledCommand(message)
        .then((called) => {
            if(called){
                console.log('called function completed.');
            }else{
                console.log('undefined function called.');
            }
        });
}

client.on('ready', () => {
    console.log('ready...');
});

client.on('message', message =>{
    if(message.author.bot){
        return;
    }

    if(message.content.startsWith('!')){
        callCommand(message);
    }

    if(message.content === 'hello'){
        const reply_text = 'hello :)';
        message.reply(reply_text)
            .then(() => console.log(`sent message: ${reply_text}`))
            .catch(console.error);
        return;
    }
});

client.login(token);
