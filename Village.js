module.exports = class VillageState {
    constructor(place, parcels, roadGraph){
        this.place = place; 
        this.parcels = parcels;
        this.roadGraph = { 'Alice\'s House': [ 'Bob\'s House', 'Cabin', 'Post Office' ],
        'Bob\'s House': [ 'Alice\'s House', 'Town Hall' ],
        Cabin: [ 'Alice\'s House' ],
        'Post Office': [ 'Alice\'s House', 'Marketplace' ],
        'Town Hall': [ 'Bob\'s House', 'Daria\'s House', 'Marketplace', 'Shop' ],
        'Daria\'s House': [ 'Ernie\'s House', 'Town Hall' ],
        'Ernie\'s House': [ 'Daria\'s House', 'Grete\'s House' ],
        'Grete\'s House': [ 'Ernie\'s House', 'Farm', 'Shop' ],
        Farm: [ 'Grete\'s House', 'Marketplace' ],
        Shop: [ 'Grete\'s House', 'Marketplace', 'Town Hall' ],
        Marketplace: [ 'Farm', 'Post Office', 'Shop', 'Town Hall' ] }; 
    }
    move(destination){
        //console.log(this)
        if(!this.roadGraph[this.place].includes(destination)){
            return this; 
        }else{
            let parcels = this.parcels.map( p => {
                if(p.place != this.place) return p; 
                return ({place: destination, address : p.address})
            }).filter(p => p.address != p.place); 
            return new VillageState(destination, parcels); 
        }
    }
    static random (parcelCount = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            let address = randomPick(Object.keys(this.roadGraph));
            let place;
            do {
                place = randomPick(Object.keys(this.roadGraph));
            } while (place == address);
            parcels.push({place, address});
        }
        return new VillageState("Post Office", parcels);
    };
}
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}
