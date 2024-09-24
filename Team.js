const d = require('./Pokemon');
class Team{
    constructor(){
        this.team = [];
    }
    
    add(x){
        this.team.push(x);
    }

    display(){
        for (let k of this.team){
            console.log(k);
        }
    }
}

t1 = new Team();
// t1.add("elettro");
// t1.display();
exports.team = Team;