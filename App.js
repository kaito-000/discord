const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NTk5ODEzODAwNzkwODUxNTk3.XSqqOQ.uGrGpvHxOjjJrCQCVJLIasMIcQo';
let sendTextchannel = undefined;
const commandMap = new Map();

client.on('ready', () => {
	console.log('ready...');
});

client.on("roleCreate", role =>{
	const firstChannel = findFirstTextchannel();	
	firstChannel.send("new role created!");
});

function findFirstTextchannel(){
	for(key of client.channels){
		if(key[1].type === "text"){
			return key[1];
		}
	}
}

function callCommand(splitMessage){
	for(commandName of commandMap){
		if(commandName === splitMessage[0]){
			commandMap[commandName](splitMessage);
		}
	}
}

function setSendTextchannel(splitMessage){
	for(value of client.channels){
		if(splitMesage[1] === value[1]){		
		}
	}
}

client.on("message", message =>{

	if(message.author.bot){
		return;
	}

	if(message.content.startsWith("!"){
		callCommand(message.split(" "));
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
