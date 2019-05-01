module.exports = class Vec {
    constructor(x, y){
        this.x = x; 
        this.y = y; 
    }
    plus({x, y}){
        x = this.x + x; 
        y = this.y + y; 
        return new Vec(x , y);
    }
    minus({x, y}){
        x = this.x - x; 
        y = this.y - y; 
        return new Vec(x , y);
    }
    get length(){
        return Math.sqrt((this.x - 0)*(this.x - 0) +(this.y - 0)*(this.y - 0));
    }
}