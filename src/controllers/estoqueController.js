const estoqueModel = require("../models/estoqueModel");

const listar = (req, res) => {

    estoqueModel.listarEstoque((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

const buscarPorId = (req, res) => {

    estoqueModel.buscarEstoquePorId(
        req.params.id,
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {
                return res.status(404).json({
                    mensagem: "Estoque não encontrado."
                });
            }

            res.json(results[0]);
        }
    );

};

const criar = (req, res) => {

    estoqueModel.criarEstoque(
        req.body,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                mensagem: "Estoque cadastrado com sucesso!"
            });
        }
    );

};

const entrada = (req, res) => {

    estoqueModel.adicionarQuantidade(
        req.params.id,
        req.body.quantidade,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensagem: "Quantidade adicionada ao estoque com sucesso!"
            });

        }
    );

};

const saida = (req, res) => {

    estoqueModel.baixarQuantidade(
        req.params.id,
        req.body.quantidade,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensagem: "Quantidade retirada do estoque com sucesso!"
            });

        }
    );

};

const excluir = (req, res) => {

    estoqueModel.excluirEstoque(
        req.params.id,
        (err) => {

            if (err) {
                return res.status(500).json(err);
                    mensagem: "Erro interno no servidor."
            }

            res.json({
                mensagem: "Estoque foi excluído com sucesso!"
            });
        }
    );

};


module.exports = {
    listar,
    buscarPorId,
    criar,
    entrada,
    saida,
    excluir
};
