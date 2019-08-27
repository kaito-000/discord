const commandMap = require('./command.js');
const BotDo = require('./BotDo.js');
const mistypeMessage = 'Command is mistyped!\nplz check **--help** command';

function callCommand(message){
    const splitedMessage = message.content.split(' ');
    const commandName = splitedMessage.shift();
    const arg = splitedMessage;

    const dummyArg = ' ';
    const sendEroor= 'reply';
    const notFoundCommand = new BotDo(
        dummyArg, sendEroor, (() => mistypeMessage)
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
        return message.reply(mistypeMessage)
            .then(() => false);
    }
    if(BotDo.whatDo === 'reply'){
        const replyText = BotDo.process(message, arg);
        return message.reply(replyText)
            .then(() => true);
    }
}

module.exports = callCommand;
