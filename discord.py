import discord

client = discord.Client()

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')

@client.event
async def on_message(message):
    # �u���͂悤�v�Ŏn�܂邩���ׂ�
    if message.content.startswith("���͂悤"):
        # ����傪Bot�������ꍇ�����������Ȃ��̂�
        if client.user != message.author:
            # ���b�Z�[�W�������܂�
            m = "���͂悤�������܂�" + message.author.name + "����I"
            # ���b�Z�[�W�������Ă����`�����l���փ��b�Z�[�W�𑗂�܂�
            await message.channel.send(m)

client.run("NTk5ODEzODAwNzkwODUxNTk3.XSqqOQ.uGrGpvHxOjjJrCQCVJLIasMIcQo")