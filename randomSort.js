'use strict';

function randomSort(members){
    members.sort(() => Math.random() - Math.random());
}

module.exports = randomSort;
