const sql = require("mssql");
const CONFIG ={
    user: 'sa',
    password:'123456789',
    server: 'localhost',
    database: 'LojaDB',
    options:{
        encrypt: true,
        trustServerCertificate: true //Ignora o erro de certificação autoassinado
    }
}

async function getConnection(){
    try {
        const pool = await sql.connect(CONFIG);
        return pool;
    } catch (error) {
        console.error('Erro na conexão SQL Serve:', error);
    }
}
//(async()=>{
    //try {
      //   const pool =await getConnection
//console.log("Conexão estabelecidade com sucesso!");
//} catch (error) {
//console.error("Error ao estabelecer conexaõ", error);
//}
   
//})()

module.exports ={sql, getConnection};