export default class Agency{
    constructor(name,address){
        this.name = name;
        this.address = address;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getAddress(){
        return this.address;
    }

    setAddress(){
        this.address = address;
    }
}