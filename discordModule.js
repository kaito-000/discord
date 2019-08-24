'use strict';

function makeMemberList(channel){
    const list = [];
    for(let member of channel.members){
        list.push(member[1].user);
    }
    return list;
}

function findVoicechannel(guild, author){
    for(let channel of guild.channels){
        if(channel[1].type === 'voice'){
            for(let member of channel[1].members){
                if(member[1].id === author.id){
                    return channel[1];
                }
            }
        }
    }
}

module.exports = {makeMemberList, findVoicechannel};
