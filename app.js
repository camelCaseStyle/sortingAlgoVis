let journal = require('./s.js');
const http = require("http");
const hostname = "127.0.0.1";
const port = "48088";
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, ()=>{
    console.log("server is running");

    let array = []
    for(let j = 0; j < 4; j ++){
        array.push(j);
    }
    let arrayOne = [1,2,3]; 
    let arrayTwo = [1,2]
    let list = arrayToList(array); 
    list = prepend(4, list); 
    console.log(deepEqual(arrayOne, arrayTwo))
})

// Given an event return a table for that event
function tableFor(event, journal){
    let table = [0, 0, 0, 0];
    for(let i = 0; i < journal.length; i++){
        let entry = journal[i], index = 0;
        if(entry.events.includes(event)) index += 1;
        if(entry.squirrel) index += 2; 
        table[index] += 1; 
    }
    return table;
}

function journalEvents(journal){
    let allEvents = [];
    for(let entry of journal){
        for(let event of entry.events){
            if(!allEvents.includes(event)) allEvents.push(event);
        }
    }   
    return allEvents; 
}
function listCorr(journal){
    for (let event of journalEvents(journal)) {
        console.log(event + ":", phi(tableFor(event, JOURNAL)));
        }
}

function phi(table){
    return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
    (table[0] + table[1]) *
    (table[1] + table[3]) *
    (table[0] + table[2]));
}

function range(start, end, step = start < end ? 1 : -1) {
    let array = [];
  
    if (step > 0) {
      for (let i = start; i <= end; i += step) array.push(i);
    } else {
      for (let i = start; i >= end; i += step) array.push(i);
    } 
    return array;
}
  
function reverseArray(array){
    let reversed = [];
    for(let elem of array){
        reversed.unshift(elem);
    }
    return reversed;
}
function reverseArrayInPlace(array){
    let tmp;
    for(let j = 0 ; j < Math.floor(array.length/2); j++){
        tmp = array[j];
        array[j] = array[array.length - j - 1]; 
        array[array.length -j - 1] = tmp;
    }
}
function arrayToList(array){
    let list = null; 
    for(let elem of array){
        list = {value: elem, rest : list};
    }
    return list;
}
function listToArray(list){
    console.log(list);
    let array = []; 
    while(list.rest !=  null){
        array.push(list.value);
        list = list.rest; 
    }
    return array; 
} 
function prepend(elem, list){
    list = {
        value: elem, 
        rest: list
    }
    return list; 
}
function nth(list, number){
    for(let i = 0; list.rest != null; i++){
        if(i === number){
            return list.value; 
        }
        list = list.rest
    }
}
function nthRecursive(list, number){
    if(list === null) return undefined;
    if(number === 0) return list.value; 
    return nthRecursive(list.rest, number-1);
} 

function deepEqual(objOne, objTwo){
    if(objOne === objTwo) return true;
    if(objOne == null  || typeof objOne != "object" || objTwo == null || typeof objTwo != "object") return false;
    if(typeof objOne === "object" && typeof objTwo === "object"){
        let keysOne = Object.keys(objOne); 
        let keysTwo = Object.keys(objTwo);
        // do they have the same keys? 
        if(keysOne.length === keysTwo.length){
            for(let elem of keysOne){
                if(!keysTwo.includes(elem) || !deepEqual(objOne[elem], objTwo[elem])) return false; 
            } 
            return true;
        }
    }
    return false; 
}