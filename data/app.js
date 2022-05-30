//https://www.npmjs.com/package/mongodb
//https://imasters.com.br/banco-de-dados/mongodb-para-iniciantes-em-nosql-parte-02


//Importação do MongoDB
const { MongoClient } = require('mongodb');


// Conexão da URL do Servidor
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Nome do DataBase
const dbName = 'TrabalhoBD';


// Conexão com a Collection especifica
client.connect();
console.log('Conexão com o server Feita');
const db = client.db(dbName);
const collection = db.collection('Alunos');
const colecao2 = db.collection('MateriaBD2')

// Inserir 

async function inserirUm(){
  const insertResult = await collection.insertOne({
    nome:"Tarcizo"
  });
  console.log('Inserted documents =>', insertResult);
}

const a = {nome:"CARLOS ALVES", idade:"19", matricula:"202015020004"}
const b = {nome:"DEBORA CRISTIANE", idade:"20", matricula:"201825020009"}
const c = {nome:"EZEQUIAS OLIVEIRA", idade:"19", matricula:"202025020025"}
const d = {nome:"GUILHERME COSA", idade:"20", matricula:"202015020014"}
const e = {nome:"IRIEDSON VILAR", idade:"21", matricula:"202025020005"}
const f = {nome:"JAN LIRA", idade:"18", matricula:"202025020010"}
const g = {nome:"TARCIZO FILHO", idade:"21", matricula:"202015020032"}
const h = {nome:"THALLYTA MEDEIROS", idade:"20", matricula:"202025020004"}
//-------------
const aN = {matricula:"202015020004", status:"Aprovado", media: "80"}
const bN = {matricula:"201825020009", status:"Aprovado", media: "80"}
const cN = {matricula:"202025020025", status:"Aprovado", media: "90"}
const dN = {matricula:"202015020014", status:"Aprovado", media: "75"}
const eN = {matricula:"202025020005", status:"Aprovado", media: "100"}
const fN = {matricula:"202025020005", status:"Aprovado", media: "100"}
const gN = {matricula:"202015020032", status:"Aprovado", media: "70"}
const hN = {matricula:"202025020004", status:"Aprovado", media: "95"}
//Inseris Vario 

async function inserirVarios(){
  //[aN,bN,cN,dN,eN,fN,gN,hN]
  //[a,b,c,d,e,f,g,h]
  const insertResult = await collection.insertMany([a,b,c,d,e,f,g,h]);
  console.log('Inserted documents =>', insertResult);
}

//Mostrar

async function mostrarTodos(){
  const findResult = await collection.find({}).toArray();
//console.log('Found documents =>', findResult);
console.log('Found documents =>', findResult);
}

//-----Com filtro

async function mostrarUm(){
  const filteredDocs = await collection.find({nome: 'Tarcizo'}).limit(1).toArray();
  console.log('Found documents filtered by primeira pesso com o nome Tarcizo =>', filteredDocs);
}

async function mostrarPorNome(){
  const filteredDocs = await collection.find({nome: {$ne: 'TARCIZO FILHO'}}).toArray();
  console.log('Pessoas com nome { nome != Tarcizo} =>', filteredDocs);
}


/* $e: exatamente igual (=)
$ne: diferente (<> ou !=)
$gt: maior do que (>)
$lt: menor do que (<)
$lte: menor ou igual a (<=)
$in: o valor está contido em um array de possibilidades, como em um OU. Ex: {idade: {$in: [10,12] }} */

async function mostrarPorIdade(){
  const filteredDocs = await collection.find({idade: {$gte: '18'}}).toArray();
  console.log('Pessoas com idade maior que 18 =>', filteredDocs);
}

async function mostrarPorRegex(){
  const filteredDocs = await collection.find({nome:{$regex: /T/ }}).toArray();
  console.log('Pessoas com a Letras T no nome =>', filteredDocs);
}
//=============== Medias
async function mostrarAprovados(){
  const filteredDocs = await (await collection.find({media: {$gte: '70'}}).toArray());
  console.log('Alunos aprovados =>', filteredDocs);
}



// Update
async function AtualizarUmAtributo(){ //muda 1 atributo
  const filteredDocs = await collection.updateMany({nome: 'Carlos'}, {$set: {nome:'Guilherme'}});
}


async function AtualizarDoisAtributo(){ //altera 2 atributos
  const filteredDocs = await collection.updateOne({nome: 'Tj'}, {$set:{nome:'Tarcizo', idade:'40'}});
}

async function AdicionarUmNovoAtributo(){ //adiciona uma atributo que não se tinha
  const filteredDocs = await collection.updateOne({nome: 'Tj'}, {$set:{nome:'Tarcizo', idade:'40', data:'19/01/2001'}});
}

async function ExcluirUmAtributo(){ //exclui um atributo
  const filteredDocs = await collection.updateOne({nome: 'Tarcizo'}, {$unset:{idade:""}});
}

async function AlterarNomeDaVareavel(){ //altera o nome da vareavel
  const filteredDocs = await collection.updateMany({}, {$rename:{'data': 'dataDeNascimento'}});
}

//Join



// Deletar
async function excluirTodos() {
  const deleteResult = await collection.deleteMany({});
  console.log('Deleted documents =>', deleteResult);
}
  
async function excluirUm() {
  const deleteResult = await collection.deleteOne({ nome:"Tarcizo" });
  console.log('Deleted documents =>', deleteResult);
}

//inserirUm()
//inserirVarios()

mostrarTodos()
//mostrarUm()
//mostrarPorNome()
//mostrarPorIdade()
//mostrarPorRegex()

//mostrarAprovados()


//AtualizarUmAtributo()
//AtualizarDoisAtributo()
//AdicionarUmNovoAtributo()
//ExcluirUmAtributo()
//AlterarNomeDaVareavel()

//excluirTodos()
//excluirUm()

.finally(()=>client.close())


