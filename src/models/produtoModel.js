/**
 * @fileoverview Módulo de modelo para manipulação de dados da tabela Produtos.
 * Contém funções para buscar, inserir, atualizar e deletar produtos.
 */
//Importar a conexão com o bancos de dados  e tipos de dasos SQL
const {sql, getConnection}= require("../config/db");

/**
 * @typedef {object} Produto
 * @property {string} idProduto O ID único do produto (geralmente um GUID/UniqueIdentifier).
 * @property {string} nomeProduto O nome do produto.
 * @property {number} precoProduto O preço do produto.
 */

/**
 * Objeto modelo que contém os métodos de acesso a dados (CRUD) da entidade Produto.
 * @namespace produtoModel
 */
const produtoModel={
    /**
     * Modelo que busca todos os produtos no banco de dados.
     * * @async
     * @function buscarTodos
     * @returns {Promise<Array>} Retorna uma lista com todos os produtos.
     * @throws Mostra no console e propaga o erro caso a busca falhe.
     */
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

    /**
     * Busca um único produto no banco de dados pelo seu ID.
     * * @async
     * @function buscarUm
     * @param {string} idProduto O ID único do produto a ser buscado.
     * @returns {Promise<Array<Produto>>} Retorna um array contendo o produto encontrado, ou um array vazio se não existir.
     * @throws {Error} Propaga o erro caso a busca falhe.
     */
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

    /**
     * Insere um novo produto no banco de dados.
     * * @async
     * @function inserirProduto
     * @param {string} nomeProduto O nome do novo produto.
     * @param {number} precoProduto O preço do novo produto.
     * @returns {Promise<void>} Não retorna valor, apenas completa a operação ou lança um erro.
     * @throws {Error} Propaga o erro caso a inserção falhe.
     */
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

    /**
     * Atualiza o nome e o preço de um produto existente.
     * * @async
     * @function atualizarProdutos
     * @param {string} idProduto O ID único do produto a ser atualizado.
     * @param {string} nomeProduto O novo nome do produto.
     * @param {number} precoProduto O novo preço do produto.
     * @returns {Promise<void>} Não retorna valor, apenas completa a operação ou lança um erro.
     * @throws {Error} Propaga o erro caso a atualização falhe.
     */
    atualizarProdutos: async (idProduto, nomeProduto, precoProduto) => {
        
        try {
            const pool = await getConnection();

            // Evitar SQL Injection
            const querySQL = `
                UPDATE Produtos
                SET nomeProduto = @nomeProduto,
                    precoProduto = @precoProduto
                WHERE idProduto = @idProduto 
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

    },

    /**
     * Deleta um produto do banco de dados pelo seu ID.
     * * @async
     * @function deletarProduto
     * @param {string} idProduto O ID único do produto a ser deletado.
     * @returns {Promise<void>} Não retorna valor, apenas completa a operação ou lança um erro.
     * @throws {Error} Propaga o erro caso a exclusão falhe.
     */ 
    deletarProduto: async (idProduto) => {
        try {
            const pool = await getConnection();
            const querySQL = `
                DELETE FROM Produtos
                WHERE idProduto = @idProduto
            `

            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao detetar produto:', error);
            throw error;          
        }
    }
};


module.exports = {produtoModel};