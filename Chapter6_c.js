const http = require("http");
const hostname = "127.0.0.1";
const port = "8080";
const vector = require('./Vector');
const Group = require('./Group');
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, ()=>{
    console.log("Server is running"); 
    // listProto({name: "Anubhav", age: 42});
    // console.log(Array.prototype);
    // let fancyRabbit = createRabbit("Fancy");
    // console.log(fancyRabbit.speak(`I am so fancy`));
    // console.log(new vector(1, 2).plus(new vector(2, 3)));
    // // → Vec{x: 3, y: 5}
    // console.log(new vector(1, 2).minus(new vector(2, 3)));
    // // → Vec{x: -1, y: -1}
    // console.log(new vector(3, 4).length);
    // let group = Group.from([10, 20]);
    // console.log(group.printThis());
    // console.log(group.has(10));
    // → true
    // console.log(group.has(30));
    // → false
    // group.add(10);
    // console.log(group);
    // group.delete(10);
    // console.log(group);
    // console.log(group.has(10)); 
    // → false
    // for (let value of Group.from(["a", "b", "c"])) {
    //     console.log(value);
    // }
    
    let map = {one: true, two: true, hasOwnProperty: true};
    console.log(Object.prototype.hasOwnProperty.apply(map, ["one"]));
})

function listProto(obj){
    
    if (obj != null) {
        console.log(Object.getPrototypeOf(obj));
        return listProto(Object.getPrototypeOf(obj))
    }
    return;

}

let _rabbit = {
    speak : function(sentence){
        console.log(`${this.type} says '${sentence}'`);
    }
}
function createRabbit(type){
    let rabbit = Object.create(_rabbit);
    rabbit.type = type;
    return rabbit; 
}