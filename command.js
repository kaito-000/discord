'use strict';

const siegeAllFields = require('./siegeMap.js');
const numOfFieldsMap = siegeAllFields.numOfFieldsMap;
const allFieldList = siegeAllFields.siegeAllFieldList;

const BotDo = require('./BotDo.js');
const diceRoll = require('./random.js');
const discordModule = require('./discordModule.js');
const randomSort = require('./randomSort.js');
const commandMap = new Map();

const pickMapArg = [/^(comp|ranked|casual)$/];
const pickMapDoing = 'reply';
function pickMap(dontUse,arg){
    let replyText = '';
    const mapPool = arg[0];
    if(numOfFieldsMap.has(mapPool)){
        const randomFieldIndex = diceRoll(numOfFieldsMap.get(mapPool)) - 1;
        const randomFieldname = allFieldList[randomFieldIndex].name;
        replyText = `You play **${randomFieldname}**.`;
    }else{
        replyText = 'map pool is not defined.\nmap pool is "comp", "ranked" and "casual".';
    }
    return replyText;
}
commandMap.set('--map',new BotDo(pickMapArg, pickMapDoing, pickMap));

const teamShuffleArg = [/^[0-9]+$/];
const teamShuffleDoing = 'reply';
function teamShuffle({guild, author}, arg){
    const numOfTeam = arg[0];
    const channel = discordModule.findVoicechannel(guild, author);
    const members = discordModule.makeMemberList(channel);
    const numOfPlayer = members.length / numOfTeam;
    randomSort(members);

    let replyText = '';
    if(members.length < numOfTeam){
        replyText = `**Failed!**\nnot enough members in your voice channel to make ${numOfTeam} teams.`;
    }else if(numOfTeam == 0){
        replyText = 'Zero team?\nAre you serious?'; 
    }else{
        for(let i = 0; i < numOfTeam; i++){
            replyText += `**team${i + 1}**\n`;
            for(let j = 0; j < numOfPlayer; j++){
                replyText += `[${members[i * numOfPlayer + j].username}]`;
            }
            replyText += '\n\n';
        }
    } 
    return replyText;
}
commandMap.set('--team',new BotDo(teamShuffleArg, teamShuffleDoing, teamShuffle));

module.exports = commandMap;
