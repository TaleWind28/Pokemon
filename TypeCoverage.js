const tipi = require('./Tipi');
const team = require('./Team');
class ArrayTipi{
    constructor(){
        this.tobeat = [tipi.normale,tipi.lotta,tipi.volante,tipi.veleno,tipi.terra,tipi.roccia,tipi.coleottero,tipi.spettro,tipi.acciaio,tipi.fuoco,tipi.acqua,tipi.erba,tipi.elettro,tipi.psico,tipi.ghiaccio,tipi.drago,tipi.buio,tipi.folletto];
    }
}

//classe Coverage che gestisce la copertura dei tipi nella squadra 
 class Coverage{
    constructor(){
        this.cover = {};
        this.team ={};
        this.need = {};
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

    length(x){
        let count = 0;
        for (let k in x){
            count++;
        }
        return count;
    }

    isFull(){
        if (this.length(this.cover) == 18){
            return true;
        }
        return false;
    }

    Permuta(){
        var count = 0;
        var team = this.team;
        for ( var k in team){
            for (var k1 in team){
                if (k != k1){
                    this.need[k+"/"+k1] = new tipi.doppiotipo(this.team[k],this.team[k1]);
                    count++;
                }
            }
            delete team[k];
        }
        return console.log(count,"numero di combinazioni di tipi possibili");
    }

    Needing(){
        var l = this.length(this.need);
        if (l == 0){
            return false;
        }
        return true;
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
    eliminate(coverage,tobeat);//funzione che elimina i tipi già coperti
    missing(tobeat)//ciclo per cercare il prossimo tipo da aggiungere
    var x = MaxObj(obj);//calcolo del tipo da aggiungere
    return ricostruisci(x,beaten)//funzione che ritorna il tipo
}

//funzione che completa una coverage data in input
 function Complete(coverage,tobeat,beaten){
    //caso base
    if (coverage.isFull()){
        // Usa map per raccogliere i valori in una lista
        let coverageLine = Object.keys(coverage.team).map(k => k).join(', ');
        console.log("Coverage:",coverageLine,"\n",coverage.length(coverage.team),"tipi necessari per completare la coverage");
        return;
    }
    x = calcdeb(coverage,tobeat,beaten);//funzione che ritorna il tipo da aggiungere;
    coverage.addBeaten(x);//aggiunta di quello che batte il tipo calcolato
    Complete(coverage,tobeat,beaten);//chiamata ricorsiva
}

//variabili esportate dal file
exports.Complete = Complete;
exports.ArrayTipi = ArrayTipi;
exports.Coverage = Coverage;