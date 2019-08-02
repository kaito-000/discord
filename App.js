const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NTk5ODEzODAwNzkwODUxNTk3.XUPFeQ.MzrjtEDjxNE5SACUEkBcOLrweKQ';

const commandMap = new Map();

function makeMemberList(channel){
  const list = [];
  for(member of channel.members){
    list.push(member[1].user);
  }
  return list;
}

function findVoicechannel(message){
  for(channel of message.guild.channels){
    if(channel[1].type === 'voice'){
      for(member of channel[1].members){
        if(member[1].id === message.author.id){
          return channel[1];
        }
      }
    }
  }
}

function randomSort(members){
  for(member of members){
    member.randomNum = Math.floor(Math.random() * 100);
  }
  members.sort((a,b) => a.randomNum - b.randomNum );
}

function teamSuffle(message){
  const numOfTeam = message.content.split(" ")[1];
  const channel = findVoicechannel(message);
  const members = makeMemberList(channel);
  const numOfPlayer = members.length / numOfTeam;
  randomSort(members);

  let replyText = `yes\n I try to make ${numOfTeam} teams in your voicechannel\n\n`;
  if(members.length < numOfTeam){
    replyText += `**Failed!**\nnot enough members in your voice channel to make ${numOfTeam} teams.`;
  }else{
    for(let i = 0; i < numOfTeam; i++){
      replyText += `**team${i + 1}**\n`;
      for(let j = 0; j < numOfPlayer; j++){
        replyText += `[${members[i * numOfPlayer + j].username}]`;
      }
      replyText += `\n\n`;
    }
  } 

  message.reply(replyText)
    .then(message => console.log("team maked"))
    .catch(console.error);
}
commandMap.set("!team",teamSuffle);

function callCommand(message){
  let called = false;
  for(commandName of commandMap){
    if(commandName[0] === message.content.split(" ")[0]){
      commandName[1](message);
      called = true;
    }
  }
  if(!called){
    message.reply("sry I dont have any idea.")
      .then(message => console.log("undefined function was called."))
      .catch(console.error);
  }
}

client.on('ready', () => {
    console.log('ready...');
    });

//メッセージに対するイベント
client.on("message", message =>{
    if(message.author.bot){
    return;
    }

    if(message.content.startsWith("!")){
    callCommand(message);
    }

    if(message.content === "hello"){
    const reply_text = "hello :)";
    message.reply(reply_text)
    .then(message => console.log(`sent message: ${reply_text}`))
    .catch(console.error);
    return;
    }
    });

client.login(token);
