const http = require("http");
const hostname = "127.0.0.1";
const port = "8080";
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, ()=>{
    console.log("server is running");    
    numberToString(13,10);
})
function numberToString(n, base = 10) {
    let result = "", sign = "";
    debugger
    if (n < 0) {
        sign = "-";
        n = -n;
    }
    do {
        result = String(n % base) + result;
        n  = Math.floor(n/base);
    } while (n > 0);
    return sign + result;
}

function primitiveMultiply (a,b){
    return a*b; 
}

function callMultiply{
    for(;;){
        try{
            primitiveMultiply(2,5);
            break; 
        }catch(e){
            console.log("Trying again");
        }
    }
}