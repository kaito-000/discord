'use strict';

function diceRoll(faceNum){
    const random = Math.floor(Math.random() * (faceNum + 1));
    if(random == 0 || random > faceNum){
        return diceRoll(faceNum);
    }
    return random;
}

module.exports = diceRoll;
