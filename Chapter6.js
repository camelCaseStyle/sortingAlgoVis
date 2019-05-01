const http = require("http");
const hostname = "127.0.0.1";
const port = "8080";
let scripts = require("./supportingFile6.js");
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, ()=>{
    console.log("server is running");
    // console.log(SCRIPTS.reduce((a, b) => {
    //     return characterCount(a) < characterCount(b) ? b : a;
    //     }));
    let avg 
    // console.log(Math.round(average(scripts.filter(script => script.living).map(script => script.year))));
    // console.log(Math.round(average(scripts.filter((script) => !script.living).map((script) => script.year))));
  
   // console.log(characterCode(121));
//    console.log(flatten([[1,2], [3,4], [5,6]]));
// dominantDirection("Hello")
    console.log(dominantDirection("Hey, مساء الخير"));
})


function characterScript(code){
    for(let script of scripts){
        if(script.ranges.some(([from, to])=>{
            return code >= from && code < to;
        })){
            return script; 
        }
    }
}

function countBy(items, groupName){
    let counts = []; 
    for (let item of items){
        let name = groupName(item);
        let known = counts.findIndex((c) => c.name == name);
        if(known === -1){
            counts.push({name, count: 1});
        }else{
            counts[known].count++;
        }
    }
    return counts;
}


function average(array) {
    
    return array.reduce((a,b)=> {
        return a + b;
    })/array.length;
}

function characterCount(script) {
    return script.ranges.reduce((count, [from, to]) => {
        // console.log("count = " +count);
        // console.log("from = " +from );
        // console.log("to = " +to)
    return count + (to - from);
    },0);
}

function textScripts(text){
    let scripts = countBy(text, char => {
        characterScript(char.codePointAt(0));
        return script ? script.name : "none";

    }).filter(({name})=> name != none );
}


// Flattening 

function flatten(array){
    return array.reduce((a,b) => a.concat(b));
}

// Your own loop 

function loop(value, test, update, body){
    if(test(value)){
        body(value); 
        return loop(update(value), test, update, body);
    }
    return; 
}

function everyLoop(array, test){
    for(let elem of array){
        if(!test(elem)) return false;
    }
    return true;
}

function everySome(array, test){
    return !array.some((a)=>!test(a));
}


function dominantDirection(text){
    let counted  = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }).filter(({name}) => name != "none");
    
    if(counted.length == 0) return "ltr"; 
    return counted.reduce((current, previous) => current.count > previous.count ? current : previous).name;

}