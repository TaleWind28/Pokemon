
//interfaccia che crea l'oggetto Tipo
class Tipo{
    constructor(nome,effective,weak){
        this.nome = nome;
        this.effective = effective;
        this.weak = weak;
    }
}

//interfaccia che crea l'oggetto Pokemon
class Pokemon{
    constructor(nome,tipo){
        this.nome = nome;
        this.tipo = tipo;
    }
}

//classe Coverage che gestisce la copertura dei tipi nella squadra 
class Coverage{
    constructor(){
        this.cover = {};
        this.team ={};
        this.temp;
    }

    addBeaten(tipo){
        for (let k = 0;k<tipo.effective.length;k++){
            this.cover[tipo.effective[k]] = 1;
        }
        this.addTeam(tipo)
        return;
    }

    addTeam(tipo){
        this.team[tipo.nome] = tipo;
    }

    Blength(){
        let count = 0;
        for (let k in this.cover){
            count++;
        }
        return count;
    }

    Tlength(){
        let count = 0;
        for (let k in this.team){
            count++;
        }
        return count;
    }

    isFull(){
        if (this.Blength() == 18){
            return true;
        }
        return false;
    }


    //testare 
    NotNeeded(){
        var count= 0;
        for (var k in this.team){
            var temp = new Tipo(k.nome,k.effective,k.weak);
            for (let k1 in this.team){
                if (k1.nome != temp.nome){
                    if (k1.effective.length == temp.effective.length){
                        for(let i =0;i<k1.effective.length;i++){
                            if (k1.effective[i] == temp.effective[i]){
                                count++
                            } 
                        }
                        if (count == k1.effective.lenght){
                            delete this.team[k];
                        }
                    }
                }
            }
        }
    }


}

//funzione che calcola l'occorrenza massima di un tipo e ne ritorna il nome
function MaxObj(obj){
    mem = {val:-Infinity,name:""};
    for (k in obj){
        if (obj[k] == mem.val){
            if (k == "terra" || k == "lotta"){
                mem.val = obj[k];mem.name = k;
            }
        }
        if (obj[k]>mem.val){ 
            mem.val = obj[k];
            mem.name = k;
        }
    }
    return mem.name
}

function ricostruisci(x,beaten){
    for (let k = 0;k<beaten.length;k++){//ciclo su tobeat 
        if (beaten[k].nome == x){//controllo che il nome sia uguale a quello ritornato da MaxObj
            return beaten[k] //ritorno il tipo con l'occorrenza maggiore
        }
    }
}

function eliminate(coverage,tobeat){
    //doppio ciclo per eliminare da tobeat i tipi contro i quali ho già una cover
    if (coverage.length == 0) return tobeat[4];
    for (let k=0;k< tobeat.length;k++){//ciclo su tobeat 
        for (let k1 in coverage.cover){//ciclo su cover
            if (k1 == tobeat[k].nome){//confronto i nomi in cover per eliminarlo dall'array tobeat
                tobeat.splice(k,1);//elimino i nomi di troppo
            }
        }
    }
}

function missing(tobeat){
    //oggetto contenente tutti i tipi con le loro occorrenze
    obj = {"normale":0,"lotta":0,"volante":0,"veleno":0,"terra":0,"roccia":0,"coleottero":0,"spettro":0,"acciaio":0,"fuoco":0,"acqua":0,"erba":0,"elettro":0,"psico":0,"ghiaccio":0,"drago":0,"buio":0,"folletto":0};
    for (let k = 0;k<tobeat.length;k++){//ciclo su tobeat
        for (let k1 = 0;k1< tobeat[k].weak.length;k1++){
            obj[tobeat[k].weak[k1]]++ ;//aumento l'occorrenza del tipo in obj
        }
    }
}
//funzione che calcola e ritorna il tipo da aggiungere alla coverage
function calcdeb(coverage,tobeat,beaten){
    if (tobeat.length == 0)return;
    //funzione che elimina i tipi già coperti
    eliminate(coverage,tobeat);
    //ciclo per cercare il prossimo tipo da aggiungere
    missing(tobeat)
    //calcolo del tipo da aggiungere
    var x = MaxObj(obj);
    //funzione che ritorna il tipo
    return ricostruisci(x,beaten)
}

//funzione che completa una coverage data in input
function Complete(coverage,tobeat,beaten){
    //caso base
    if (coverage.isFull())return console.log(coverage.team,coverage.Tlength(),"tipi necessari per completare la coverage");
    x = calcdeb(coverage,tobeat,beaten);//funzione che ritorna il tipo da aggiungere;
    coverage.addBeaten(x);//aggiunta di quello che batte il tipo calcolato
    Complete(coverage,tobeat,beaten);//chiamata ricorsiva
    coverage.NotNeeded();
    return ;
    
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
var ghiaccio = new Tipo("ghiaccio",["volante","erba","terra","drago"],["lotta","fuoco","acciaio","fuoco","roccia"]);
var drago = new Tipo("drago",["drago"],["drago","ghiaccio","folletto"]);
var buio = new Tipo("buio",["spettro","psico"],["lotta","coleottero","folletto"]);
var folletto = new Tipo("folletto",["drago","buio","lotta"],["acciaio","veleno"]);


//array tobeat da usare nel calcolo del coverage
var tobeat = [normale,lotta,volante,veleno,terra,roccia,coleottero,spettro,acciaio,fuoco,acqua,erba,elettro,psico,ghiaccio,drago,buio,folletto];
var beaten = [normale,lotta,volante,veleno,terra,roccia,coleottero,spettro,acciaio,fuoco,acqua,erba,elettro,psico,ghiaccio,drago,buio,folletto];
//dichiarazione coverage da completare
var cov1 = new Coverage();
//tipo inziale da aggiungere 
cov1.addBeaten(terra);
//funzione che completa la coverage
Complete(cov1,tobeat,beaten);
 
