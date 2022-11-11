const mod = require('./TypeCoverage');
const tipi = require('./Tipi')
const pokemon = require('./Pokemon');
const squadra = require('./Team');

function build(coverage,squadra,dex){
    //calcolo le combinazioni
    coverage.Permuta();
    //caso base  
    if (!(coverage.Needing())) return console.log(squadra.team,"Team Suggerito"); //printo il team
    //cerco nel dex il tipo necessario
    for (t in coverage.need){
        for (k in dex){//k1 è il tipo del pokemon contenuto nel dex
            //aggiustare perchè t.nome è "tipo1/tipo2" quindi basta togliere alla stringa "/tipo2"
            if (dex[k] == t.nome){
                for (let i = 0; i<dex[k].length;i++){
                    if(dex[k][i].typing.primo != t.nome){
                        //aggiungo il pokemon al team
                        team.add(dex[k][i]);
                        break;
                    }
                }
            }
        }
    }
    //continuo finchè ho tipi in need
    build(coverage,squadra,dex);
    return;
}

//Test Case
c1 = new mod.Coverage();
t1 = new mod.ArrayTipi();
listatipi = new mod.ArrayTipi();
s1 = new squadra.team();
c1.addBeaten(tipi.terra);
mod.Complete(c1,t1.tobeat,listatipi.tobeat);
c1.Permuta();
//build(c1,s1.team,pokemon.dex.dex)