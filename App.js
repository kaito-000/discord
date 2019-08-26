'use strict';
const http = require('http');
const server = http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end('discord bot activated'); 
});

const port = process.env.PORT || 8080;
server.listen(port);

const Discord = require('discord.js');
const client = new Discord.Client();
const callCommand = require('callCommand.js');

client.on('ready', () => {
    console.log('ready...');
});

client.on('message', message =>{
    if(message.author.bot){
        return;
    }
    if(message.content.startsWith('--')){
        callCommand(message);
        return;
    }
});

const token = '';
client.login(token);
