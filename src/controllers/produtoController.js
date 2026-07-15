const produtoModel = require("../models/produtoModel");

const listar = (req, res) => {

    produtoModel.listarProdutos((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

const buscarPorId = (req, res) => {

    produtoModel.buscarProdutoPorId(
        req.params.id,
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {
                return res.status(404).json({
                    mensagem: "Produto não encontrado."
                });
            }

            res.json(results[0]);
        }
    );

};

const criar = (req, res) => {

    produtoModel.criarProduto(
        req.body,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                mensagem: "Produto cadastrado com sucesso!"
            });
        }
    );

};

const atualizar = (req, res) => {

    produtoModel.atualizarProduto(
        req.params.id,
        req.body,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensagem: "Produto atualizado com sucesso!"
            });
        }
    );

};

const excluir = (req, res) => {

    produtoModel.excluirProduto(
        req.params.id,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensagem: "Produto excluído com sucesso!"
            });
        }
    );

};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};