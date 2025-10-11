// Importa a biblioteca para conectar ao SQL Server.
const sql = require("mssql");
// Objeto com as configurações de acesso ao banco de dados.
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

// Função assíncrona que estabelece e retorna um pool de conexões.
async function getConnection(){
    try {
        // Tenta conectar ao banco usando as configurações definidas.
        const pool = await sql.connect(CONFIG);
        return pool;
    } catch (error) {
        console.error('Erro na conexão SQL Serve:', error);
    }
}

// Exporta a função e a biblioteca para serem usadas em outras partes do projeto.
module.exports ={sql, getConnection};