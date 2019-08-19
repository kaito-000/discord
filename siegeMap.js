'use strict';

class Field{
    constructor(name,pool){
        this.name = name;
        this.pool = pool;
    }
}

const siegeAllFieldList = [];

siegeAllFieldList.push(new Field('Bank','Competitive'));
siegeAllFieldList.push(new Field('Border','Competitive'));
siegeAllFieldList.push(new Field('Clubhouse','Competitive'));
siegeAllFieldList.push(new Field('Coastline','Competitive'));
siegeAllFieldList.push(new Field('Consulate','Competitive'));
siegeAllFieldList.push(new Field('Kafe Dostoyevsky','Competitive'));
siegeAllFieldList.push(new Field('Villa','Competitive'));
siegeAllFieldList.push(new Field('Chalet','Ranked'));
siegeAllFieldList.push(new Field('Fortress','Ranked'));
siegeAllFieldList.push(new Field('Hereford Base','Ranked'));
siegeAllFieldList.push(new Field('Oregon','Ranked'));
siegeAllFieldList.push(new Field('Outback','Ranked'));
siegeAllFieldList.push(new Field('Skyscraper','Ranked'));
siegeAllFieldList.push(new Field('Theme Park','Ranked'));
siegeAllFieldList.push(new Field('Favela','Casual'));
siegeAllFieldList.push(new Field('House','Casual'));
siegeAllFieldList.push(new Field('Kanal','Casual'));
siegeAllFieldList.push(new Field('Presidential Plane','Casual'));
siegeAllFieldList.push(new Field('Tower','Casual'));
siegeAllFieldList.push(new Field('Yacht','Casual'));

let numOfComp = 0;
let numOfRanked = 0;
let numOfCasual = 0;
for(let map of siegeAllFieldList){
    if(map.pool != 'Casual'){
        if(map.pool != 'Ranked'){
            numOfComp++;
        }
        numOfRanked++;
    }
    numOfCasual++;
}
const numOfFieldsMap = new Map();
numOfFieldsMap.set('comp',numOfComp);
numOfFieldsMap.set('ranked',numOfRanked);
numOfFieldsMap.set('casual',numOfCasual);
module.exports = {siegeAllFieldList, numOfFieldsMap};
