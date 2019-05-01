const SIZE = 143;
let boxes = [];  
for(let i = 0; i < SIZE; i++){
    let obj = {
        boxId: i, 
        width: 10, 
        height: Math.floor(Math.random()*714), 
        color : getRandomColor()
    }
    boxes.push(obj); 
}
console.log(boxes)
boxes.forEach(box =>{
    let div = document.createElement("div");
    div.id = box.boxId.toString(); 
    div.style.width = box.width + "px"; 
    div.style.height = box.height + "px"; 
    div.style.float = "right";
    div.style.background = `rgb(${box.color.red}, ${box.color.green}, ${box.color.blue})`;
    document.getElementById("main").appendChild(div); 
})

let i = 0;
let j = 1;  
function sort(){
    for(i = 0; i < boxes.length - 1; i++){
        if(boxes[i].height > boxes[i+1].height){
            swap(boxes, i+1, i); 
            
        }
        drawBox(i);
        drawBox(i+1);
        
    }
    j++;
    setTimeout(()=>{
        requestAnimationFrame(sort); 
    }, 100)
    
}

setTimeout(()=>{
    requestAnimationFrame(sort); 
}, 2000)


/*  
    HELPER FUNCTIONS 
 */
function getRandomColor(){
    return {
        // red: Math.floor(Math.random()*255), 
        // green: Math.floor(Math.random()*255), 
        // blue: Math.floor(Math.random()*255)
        red:127,
        green: 127,
        blue: 127
    }
}
function area(box){
    return box.height; 
}
function swap(boxes, smaller, larger){
    let temp = boxes[smaller];
    boxes[smaller] = boxes[larger];
    boxes[larger] = temp; 
}
function drawBox(i){
    
    let div = document.getElementById(boxes[i].boxId);
    div.style.width = boxes[i].width + "px"; 
    div.style.height = boxes[i].height + "px"; 
    div.style.background = `rgb(${boxes[i].color.red}, ${boxes[i].color.green}, ${boxes[i].color.blue})`;
    div.style.float = "right";
    document.getElementById("main").appendChild(div); 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
