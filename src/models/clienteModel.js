/**
 * @fileoverview Módulo de modelo para manipulação de dados da tabela Clientes.
 * Contém funções para buscar, inserir, atualizar e deletar clientes.
 */

//Importar a conexão com o bancos de dados  e tipos de dasos SQL
const { sql, getConnection } = require("../config/db");

/**
 * @typedef {object} Cliente
 * @property {string} idCliente O ID único do cliente (geralmente um GUID/UUID).
 * @property {string} nomeCliente O nome completo do cliente.
 * @property {string} cpfCliente O CPF do cliente (ex: '123.456.789-00').
 * @property {string} emailCliente O email do cliente.
 * @property {string} senhaCliente A senha (hash) do cliente.
 */

/**
 * Objeto modelo que contém os métodos de acesso a dados (CRUD) da entidade Produto.
 * @namespace clienteModel
 */
const clienteModel = {

    /**
     * Modelo que busca todos os clientes no banco de dados.
     * * @async
     * @function buscarTodos
     * @returns {Promise<Array<Cliente>>} Retorna uma lista com todos os clientes.
     * @throws Mostra no console e propaga o erro caso a busca falhe.
     */
    buscarTodos: async () => {
        try {
            const pool = await getConnection();

            let querySQL = "SELECT * FROM Clientes";

            const result = await pool.request().query(querySQL);
            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            throw error;
        }

    },

    /**
     * Modelo que busca um cliente por CPF no banco de dados.
     * * @async
     * @function buscarPorCPF
     * @param {string} cpfCliente O CPF único do cliente a ser buscado.
     * @returns {Promise<Cliente>} Retorna uma lista com todos os clientes.
     * @throws Mostra no console e propaga o erro caso a busca falhe.
     */
    buscarPorCPF: async (cpfCliente) => {

        try {
            const pool = await getConnection();

            let querySQL = "SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente";

            const result = await pool.request()
                .input('cpfCliente', sql.VarChar(14), cpfCliente)
                .query(querySQL);

            return result.recordset;


        } catch (error) {
            console.error("Erro ao buscar CPF:", error);
            throw error;
        }

    },

    /**
     * Modelo que busca um cliente por email no banco de dados.
     * * @async
     * @function buscarPorCPF
     * @param {string} emailCliente O email do cliente a ser buscado.
     * @returns {Promise<Cliente>} Retorna uma lista com todos os clientes.
     * @throws Mostra no console e propaga o erro caso a busca falhe.
     */
    buscarPorEmail: async (emailCliente) => {

        try {
            const pool = await getConnection();

            let querySQL = "SELECT * FROM Clientes WHERE emailCliente = @emailCliente";

            const result = await pool.request()
                .input('emailCliente', sql.VarChar(200), emailCliente)
                .query(querySQL);

            return result.recordset;


        } catch (error) {
            console.error("Erro ao buscar cliente por CPF:", error);
            throw error;
        }

    },

    /**
     * Insere um novo cliente no banco de dados.
     * * @async
     * @function inserirCliente
     * @param {string} nomeCliente O nome do novo cliente.
     * @param {string} cpfCliente O CPF do novo cliente.
     * @param {string} emailCliente O email do novo cliente.
     * @param {string} senhaCliente A senha do novo cliente.
     * @returns {Promise<void>} Não retorna valor, apenas completa a operação ou lança um erro.
     * @throws {Error} Propaga o erro caso a inserção falhe.
     */
    inserirCliente: async (nomeCliente, cpfCliente, emailCliente, senhaCliente) => {
        try {

            const pool = await getConnection();

            let querySQL = 'INSERT INTO Clientes (nomeCliente, cpfCliente, emailCliente, senhaCliente) VALUES (@nomeCliente, @cpfCliente, @emailCliente, @senhaCliente)';

            await pool.request()
                .input('nomeCliente', sql.VarChar(250), nomeCliente)
                .input('cpfCliente', sql.VarChar(14), cpfCliente)
                .input('emailCliente', sql.VarChar(200), emailCliente)
                .input('senhaCliente', sql.VarChar(255), senhaCliente)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao inserir cliente:', error);
            throw error;

        }
    }
};


module.exports = { clienteModel };