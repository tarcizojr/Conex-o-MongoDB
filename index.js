const { all } = require('express/lib/application');
const find =  require('./data/app')
const a = main.findResult
console.log("Oiiiiiiiiiiii",a)

async function main(){
    const all = await find().findResult;

    console.log("a",all)
}

main().then(r =>{
    console.log("OK" )
})
var pro = find();
console.log("n",pro)