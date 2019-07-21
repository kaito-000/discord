const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NTk5ODEzODAwNzkwODUxNTk3.XSqqOQ.uGrGpvHxOjjJrCQCVJLIasMIcQo';
let sendTextchannel = undefined;
const commandMap = new Map();

client.on('ready', () => {
	console.log('ready...');
});

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
      .then(message => console.log("undefined function was called.")
      .catch(console.error);
	}
}

function setSendTextchannel(message){
	sendTextchannel = message.channel;
	message.channel.send("I will send here!");
}
commandMap.set("!sendMe",setSendTextchannel);

client.on("message", message =>{

	if(message.author.bot){
		return;
	}

	if(message.content.startsWith("!")){
		callCommand(message);
	}
	
	if(message.content === "hello"){
		const channel = message.channel;
		const author = message.author.username;
		const reply_text = "hello :)";
		message.reply(reply_text)
			.then(message => console.log(`sent message: ${reply_text}`))
			.catch(console.error);
		return;
	}
});

client.login(token);
