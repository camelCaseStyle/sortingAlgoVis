module.exports = class PGroup{
    constructor(collection){
        this.collection = collection; 
    }
    add(x){
        if(!this.has(x)){
            let copiedCollection = this.collection; 
            copiedCollection.push(x);
            return new PGroup(copiedCollection);
        }
    }
    has(x){
        return this.collection.some(elem => elem === x); 
    }
    delete(x){
        return new PGroup(this.collection.filter(elem => elem !== x));
    }
    static Empty(){
        return this([]);
    }
}
