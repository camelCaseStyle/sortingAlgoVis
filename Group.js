module.exports = class Group{
    constructor() {
        this.group = []; 
        this.index = 0; 
    }
    static from(obj){
        let newGroup = new Group();
        for(let elem of obj){
            newGroup.add(elem);
        }
        return newGroup; 
    }
    add(x){
        if(!this.has(x)){
            this.group.push(x);
        }
    }
    delete(x){
        this.group = this.group.filter((elem)=>{
            return !(elem === x);
        });
    }
    has(x){
        return this.group.some((elem) => (elem === x));
    }
    printThis(){
        console.log(this);
    }  
    [Symbol.iterator](){
        return new GroupIterator(this);
    } 
}

class GroupIterator{
    constructor (group){
        this.group = group;
        this.index =  0; 
    }
    next(){
        if(this.index >= this.group.group.length)  return {done: true};
        let currentValue = this.group.group[this.index];
        this.index++;
        return {value : currentValue, done: false}; 
        
    }
}