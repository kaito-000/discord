'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();
const commandMap = new Map();

function textCheck(message){
    return true;
}

function diceRoll(faceNum){
    const random = Math.floor(Math.random() * 10);
    if(random == 0 || random > 6){
        return diceRoll(faceNum);
    }
    return random;
}

function diceRollSum(message){ 　
    if(textCheck(message)){ 
        const dice = message.split(' ')[1].split('d');
        const faceNum = dice[1];
        const diceNum = dice[0];
        let replyText = `${diceNum}d${faceNum} => [`;
        let sum = 0;

        for(i=0;i<diceNum;i++){
            const resultDice = diceRoll(faceNum);
            sum += resultDice;
            replyText += `${resultDice} `;
        }
        replyText += `] = ${sum}`;
    }
    return message.reply(replyText)
        .then(() => console.log('dice rolled'))
        .then(() => true);
}
commandMap.set('!dice', diceRollSum);

function makeMemberList(channel){
    const list = [];
    for(let member of channel.members){
        list.push(member[1].user);
    }
    return list;
}

function findVoicechannel(message){
    for(let channel of message.guild.channels){
        if(channel[1].type === 'voice'){
            for(let member of channel[1].members){
                if(member[1].id === message.author.id){
                    return channel[1];
                }
            }
        }
    }
}

function randomSort(members){
    members.sort(() => Math.random() - Math.random());
}

function teamShuffle(message){
    const numOfTeam = message.content.split(' ')[1];
    if(numOfTeam === undefined){
        return message.reply('plz input number of team\neg) !team 2')
            .then(() => true);
    }

    const channel = findVoicechannel(message);

    if(channel === undefined){
        return message.reply('plz join voicechannel before make teams.')
            .then(() => true);
    }

    const members = makeMemberList(channel);
    const numOfPlayer = members.length / numOfTeam;
    randomSort(members);

    let replyText = `yes\n I try to make ${numOfTeam} teams in your voicechannel\n\n`;
    if(members.length < numOfTeam){
        replyText += `**Failed!**\nnot enough members in your voice channel to make ${numOfTeam} teams.`;
    }else if(numOfTeam == 0){
        replyText += 'Are you serious?'; 
    }else{
        for(let i = 0; i < numOfTeam; i++){
            replyText += `**team${i + 1}**\n`;
            for(let j = 0; j < numOfPlayer; j++){
                replyText += `[${members[i * numOfPlayer + j].username}]`;
            }
            replyText += '\n\n';
        }
    } 

    return message.reply(replyText)
        .then(() => console.log('team maked'))
        .then(() => true);
}
commandMap.set('!team',teamShuffle);
module.exports = commandMap;
