//interfaccia che crea l'oggetto Tipo
class Tipo{
    constructor(nome,effective,weak){
        this.nome = nome;
        this.effective = effective;
        this.weak = weak;
    }
}

class DoppioTipo {
    constructor (tipo1,tipo2){
        this.first = tipo1.nome;
        this.second = tipo2.nome;
    }
}

//dichiarazione dei tipi pokemon
var normale = new Tipo("normale",[],["lotta"]);
var lotta = new Tipo("lotta",["acciaio","roccia","ghiaccio","normale","buio"],["psico","volante","folletto"]);
var volante = new Tipo("volante",["lotta","erba","coleottero"],["roccia","elettro","ghiaccio"]);
var veleno = new Tipo("veleno",["folletto","erba"],["psico","terra"]);
var terra = new Tipo("terra",["acciaio","roccia","veleno","elettro","fuoco"],["acqua","ghiaccio","erba"]);
var roccia = new Tipo("roccia",["volante","coleottero","fuoco","ghiaccio"],["acqua","acciaio","erba","lotta","terra"]);
var coleottero = new Tipo("coleottero",["erba","psico","buio"],["roccia","fuoco","volante"]);
var spettro = new Tipo("spettro",["psico","spettro"],["spettro","buio"]);
var acciaio = new Tipo("acciaio",["ghiaccio","roccia","folletto"],["terra","fuoco","lotta"]);
var fuoco = new Tipo("fuoco",["erba","coleottero","ghiaccio","acciaio"],["terra","acqua","roccia"]);
var acqua = new Tipo("acqua",["fuoco","terra","roccia"],["elettro","erba"]);
var erba = new Tipo("erba",["terra","roccia","acqua"],["veleno","fuoco","volante","ghiaccio","coleottero"]);
var elettro = new Tipo("elettro",["volante","acqua"],["terra"]);
var psico = new Tipo("psico",["veleno","lotta"],["coleottero","buio","spettro"]);
var ghiaccio = new Tipo("ghiaccio",["volante","erba","terra","drago"],["lotta","fuoco","acciaio","roccia"]);
var drago = new Tipo("drago",["drago"],["drago","ghiaccio","folletto"]);
var buio = new Tipo("buio",["spettro","psico"],["lotta","coleottero","folletto"]);
var folletto = new Tipo("folletto",["drago","buio","lotta"],["acciaio","veleno"]);

exports.normale = normale;
exports.lotta = lotta;
exports.volante = volante;
exports.veleno = veleno;
exports.terra = terra;
exports.roccia = roccia;
exports.spettro = spettro;
exports.acciaio = acciaio;
exports.coleottero = coleottero;
exports.fuoco = fuoco;
exports.acqua = acqua;
exports.erba = erba;
exports.elettro = elettro;
exports.psico = psico;
exports.ghiaccio = ghiaccio;
exports.drago = drago;
exports.buio = buio;
exports.folletto = folletto;
exports.doppiotipo = DoppioTipo;