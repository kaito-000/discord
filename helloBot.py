import discord

client = discord.Client()

@client.event
async def on_ready():
	print("Logged in as")
	print(client.user.name)
	print(client.user.id)
	print("------")

@client.event
async def on_message(message):
	if message.content.startswith("good morning"):
		if client.user != message.author:
			reply = "good morning" + message.author.name + "!"
			await message.channel.send(reply)

client.run("NTk5ODEzODAwNzkwODUxNTk3.XSqqOQ.uGrGpvHxOjjJrCQCVJLlasMlcQo")
