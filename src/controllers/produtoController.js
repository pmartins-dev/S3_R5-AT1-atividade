const {produtoModel} =require("../models/produtoModel");


    /*
    -----------------------
    CRIAR UM NOVO PRODUTO
    GET /produtos
    -----------------------
    */

const produtoController ={
    
    listarProdutos: async (req, res)=>{
        try {
            const produtos= await produtoModel.buscarTodos();
            res.status(200).json(produtos);
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({error: 'Error ao buscar produtos'});
            
        }

    },

    /*
    -----------------------
    CRIAR UM NOVO PRODUTO
    POST /produtos
    BODY:
    {
        "nomeProduto": "nome",
        "precoProduto": 0.00
    }
    -----------------------
    */

    criarProduto: async (req, res)=>{
        try {

           const {nomeProduto, precoProduto} = req.body;
           
           if (nomeProduto == undefined || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({erro: 'Campos obrigatorios não preenchidos!'});
           }

           await produtoModel.inserirProduto(nomeProduto, precoProduto);
           res.status(201).json({message: 'Produto cadastrado com sucesso!'});
            
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            res.status(500).json({erro: 'Erro ao cadatrar produto.'});
        }
    }
    
}

module.exports={produtoController};