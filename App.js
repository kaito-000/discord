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

const commandMap = require('./command.js');
const BotDo = require('./BotDo.js');
const misstypeMessage = 'Command is misstyped!\nplz check **--help** command';

function callCommand(message){
    const splitedMessage = message.content.split(' ');
    const commandName = splitedMessage.shift();
    const arg = splitedMessage;

    const dummyArg = ' ';
    const sendEroor= 'reply';
    const notFoundCommand = new BotDo(
        dummyArg, sendEroor, (() => misstypeMessage)
    );

    const calledCommand = commandMap.has(commandName) ? 
        commandMap.get(commandName) : notFoundCommand;

    commandRun(calledCommand, message, arg)
        .then((called) => {
            if(called){
                console.log('called function completed.');
            }else{
                console.log('undefined function called.');
            }
        });
}

function argmentCheck(arg, correctArg){
    for(let i = 0; i < arg.length; i++){
        if(!correctArg[i].test(arg[i])){
            return false;
        }
    }
    return true;
}

function commandRun(BotDo, message, arg){
    if(!argmentCheck(arg, BotDo.correctArg)){
        return message.reply(misstypeMessage)
            .then(() => false);
    }
    if(BotDo.whatDo === 'reply'){
        const replyText = BotDo.process(message, arg);
        return message.reply(replyText)
            .then(() => true);
    }
}
