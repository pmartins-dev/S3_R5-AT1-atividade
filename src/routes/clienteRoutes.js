const express = require("express");
const router =express.Router();
const {clienteController}= require("../controllers/clienteControllers");

// GET /clientes -> Listar todos os clientes.
router.get('/clientes', clienteController.listarClientes);

// POST /cliente -> Criar um novo cliente.
router.post('/clientes', clienteController.criarCliente);

module.exports={clienteRoutes: router};
 