const itemPedidoService = require("../services/itemPedidoService");
const itemPedidoModel = require("../models/itemPedidoModel");

const listar = (req, res) => {

    itemPedidoModel.listarItens((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

const buscarPorId = (req, res) => {

    itemPedidoModel.buscarItemPorId(req.params.id, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(404).json({
                mensagem: "Item do pedido não encontrado."
            });
        }

        res.json(results[0]);

    });

};

const criar = (req, res) => {

    itemPedidoService.criarItem(req.body, (err) => {

        if (err) {

            if (err.mensagem) {
                return res.status(404).json(err);
            }

            return res.status(500).json(err);
        }

        res.status(201).json({
            mensagem: "Item adicionado ao pedido com sucesso!"
        });

    });

};

const excluir = (req, res) => {

    itemPedidoModel.excluirItem(req.params.id, (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensagem: "Item removido com sucesso!"
        });

    });

};

module.exports = {
    listar,
    buscarPorId,
    criar,
    excluir
};