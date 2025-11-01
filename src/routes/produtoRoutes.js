const express = require("express");
const router =express.Router();
const {produtoController}= require("../controllers/produtoController");

// GET /produtos -> Listar todos os produtos.
router.get('/produtos', produtoController.listarProdutos);

// POST /produtos -> Cria um novo produto
router.post('/produtos', produtoController.criarProduto);

// POST /produtos/:id -> Atualizar um produto
router.put('/produtos/:idProduto', produtoController.atualizarProduto);

// POST /produtos/:id -> Deletar um produto
router.delete('/produtos/:idProduto', produtoController.deletarProduto);


module.exports={produtoRoutes: router};