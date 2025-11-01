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
    },

    atualizarProduto: async (req, res) => {
        try {
            const {idProduto} = req.params;
            const {nomeProduto, precoProduto} = req.body;

            // Validação de UUID.
            if (idProduto.length != 36) {
                return res.status(400).json({erro: 'id do produto inválido!'});
            }

            const produto = await produtoModel.buscarUm(idProduto)

            // Validação de o Produto existe.
            if (!produto || produto.length !== 1) {
                return res.status(404).json({erro: 'Produto não encontrado!'});
            }

            const produtoAtual = produto[0];

            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? produtoAtual.nomeProduto;

            await produtoModel.atualizarProdutos(idProduto, nomeAtualizado, precoAtualizado);
            res.status(200).json({message: 'Produto atualizado com sucesso!'});

        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({erro: 'Erro interno no servidor ao atualizar produto.'});
        }
        
    },

    deletarProduto: async (req, res) => {
        try {
            const {idProduto} = req.params;

            // Validação de UUID.
            if (idProduto.length != 36) {
                return res.status(400).json({erro: 'id do produto inválido!'});
            }

            const produto = await produtoModel.buscarUm(idProduto)

            // Validação de o Produto existe.
            if (!produto || produto.length !== 1) {
                return res.status(404).json({erro: 'Produto não encontrado!'});
            }

            await produtoModel.deletarProduto(idProduto);
            res.status(200).json({message: 'Produto deletado com sucesso!'});

        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.status(500).json({erro: 'Erro interno no servidor ao deletar produto.'});
        }
    }
    
}

module.exports={produtoController};