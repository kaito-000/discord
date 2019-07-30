const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NTk5ODEzODAwNzkwODUxNTk3.XSqqOQ.uGrGpvHxOjjJrCQCVJLIasMIcQo';

const commandMap = new Map();


function findChannel(name){
  for(value of client.channels){
    if(value[1].name === name){
      return value[1];
    }
  }
}

function makeVoicememberList(voiceChannel){
  const list = [];
  for(value of voiceChannel.members){
    
  }
}

function teamSuffle(message){
  const members = [];
  const channel = findChannel(message.content.split(" ")[1]);
  
  message.reply(`
    yes ${message.author.username}
    I make 2 teams in this voicechannel
    ${teams}`)
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
