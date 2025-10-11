//Importar a conexão com o bancos de dados  e tipos de dasos SQL
const {sql, getConnection}= require("../config/db");

const clienteModel={
    buscarTodos:async ()=>{
        try {
            const pool=await getConnection();

            let querySQL ="SELECT * FROM Clientes";

            const result =await pool.request().query(querySQL);
            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            throw error;
        }

    },

    buscarPorCPF: async (cpfCliente)=>{

        try {
            const pool = await getConnection();

            let querySQL ="SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente";

            const result = await pool.request()
                .input('cpfCliente', sql.VarChar(14), cpfCliente)
                .query(querySQL);
            
            return result.recordset;


        } catch (error) {
            console.error("Erro ao buscar CPF:", error);
            throw error;
        }

    },

    inserirCliente: async (nomeCliente, cpfCliente)=>{
        try {
            
            const pool = await getConnection();

            let querySQL = 'INSERT INTO Clientes (nomeCliente, cpfCliente) VALUES (@nomeCliente, @cpfCliente)';

            await pool.request()
                .input('nomeCliente', sql.VarChar(250), nomeCliente)
                .input('cpfCliente', sql.VarChar(14), cpfCliente)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao inserir cliente:', error);
            throw error;
            
        }
    }
};


module.exports = {clienteModel};