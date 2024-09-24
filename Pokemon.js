const tipi = require('./Tipi')

//interfaccia che crea l'oggetto Pokemon
class Pokemon{
    constructor(nome,tipo1,tipo2 = tipo1){
        this.nome = nome;
        this.typing = {primo:tipo1.nome,secondo:tipo2.nome};
    }
}

class Dex {
    constructor(){
        this.dex = {normale:[],lotta:[],elettro:[],folletto:[],buio:[],spettro:[],psico:[],veleno:[],terra:[],ghiaccio:[],fuoco:[],erba:[],acqua:[],roccia:[],drago:[],volante:[],coleottero:[],acciaio:[]}
    }

    add(pokemon){
        this.dex[pokemon.typing.primo].push(pokemon);
        if (pokemon.typing.primo != pokemon.typing.secondo){
            this.dex[pokemon.typing.secondo].push(pokemon);
        }
    }
}
pikachu = new Pokemon("Pikachu",tipi.elettro);
jigglypuff = new Pokemon("Jigglypuff",tipi.normale,tipi.folletto);
//il dex viene ordinato in base ai tipi pokemon per facilitare l'aggiunta al team;
var d= new Dex();
d.add(pikachu);
d.add(jigglypuff);
//d.add(donphan);
//d.add()
//console.log(d);
exports.dex = d;
//exports.pokemon = Pokemon;