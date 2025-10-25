//Importar a conexão com o bancos de dados  e tipos de dasos SQL
const {sql, getConnection}= require("../config/db");

const produtoModel={
    buscarTodos:async ()=>{
        try {
            const pool=await getConnection();

            let querySQL ="SELECT * FROM Produtos";

            const result =await pool.request().query(querySQL);
            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw error;
        }

    },

    buscarUm: async (idProduto) => {
        try {
            
            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Produtos WHERE idProduto = @idProduto';
            const result = await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

            return result.recordset

        } catch (error) {
            console.error('Erro ao buscar o produto:', error);
            throw error; // Reverbera o erro
        }
        
    },

    inserirProduto: async (nomeProduto, precoProduto)=>{
        try {
            
            const pool = await getConnection();

            let querySQL = 'INSERT INTO Produtos (nomeProduto, precoProduto) VALUES (@nomeProduto, @precoProduto)';

            await pool.request()
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10,2), precoProduto)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao inserir produto:', error);
            throw error;
            
        }
    },

    atualizarProdutos: async (idProduto, nomeProduto, precoProduto) => {
        
        try {
            const pool = await getConnection();

            // Evitar SQL Injection
            const querySQL = `
                UPDATE Produtos
                SET nomeProduto = @nomeProduto,
                    precoProduto = @precoProduto
                WHERE idProduto = @idProduto //NUNCA FAZER UM UPDATE SEM WHERE
            `
            await pool.request()
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }

    }
};


module.exports = {produtoModel};