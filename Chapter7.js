const roads = ["Alice's House-Bob's House", "Alice's House-Cabin",
"Alice's House-Post Office", "Bob's House-Town Hall",
"Daria's House-Ernie's House", "Daria's House-Town Hall",
"Ernie's House-Grete's House", "Grete's House-Farm",
"Grete's House-Shop", "Marketplace-Farm",
"Marketplace-Post Office", "Marketplace-Shop",
"Marketplace-Town Hall", "Shop-Town Hall"];
const VillageState = require('./Village');
const Group = require('./PGroup');
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
    Group.empty = new Group([]);
    let a = Group.empty.add("a");
    let ab = a.add("b");
    let b = ab.delete("a");

    console.log(b.has("b"));
    // → true
    console.log(a.has("b"));
    // → false
    console.log(b.has("a"));    

})
const roadGraph = buildGraph(roads);
function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function compareRobots(robotOne, memoryOne, robotTwo, memoryTwo){ 
    let numTurnsOne = 0, numTurnsTwo = 0;
    for(let i = 0 ; i < 100 ; i++){
        village = VillageState.random.call(new VillageState('Post Office', [], buildGraph(roads))); 
        numTurnsOne += runRobot(village, robotOne, memoryOne);
        numTurnsTwo += runRobot(village, robotTwo, memoryTwo);
    }
    console.log(`Robot one did an average of ${Math.floor(numTurnsOne/100)} turns`);
    console.log(`Robot one did an average of ${Math.floor(numTurnsTwo/100)} turns`);
}
function buildGraph(edges){
    let graph = Object.create(null); 
    function addEdge(from, to){
        if(graph[from] == null){
            graph[from] = [to];
        }else{
            graph[from].push(to);
        }
    }
    for(let [from, to] of roads.map(a => a.split('-'))){
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph; 
}

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
        return turn;
    }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }

}

function randomPick(array){ 
    let choice = Math.floor(Math.random() * array.length);
    return array[choice]; 
}


