const pedidoService = require("../services/pedidoService");
const pedidoModel = require("../models/pedidoModel");

const listar = (req, res) => {

    pedidoModel.listarPedidos((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

const buscarPorId = (req, res) => {

    pedidoModel.buscarPedidoPorId(
        req.params.id,
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {
                return res.status(404).json({
                    mensagem: "Pedido não encontrado."
                });
            }

            res.json(results[0]);

        }
    );

};

const criar = (req, res) => {

    pedidoService.criarPedido(
        req.body,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                mensagem: "Pedido criado com sucesso!"
            });

        }
    );

};

const atualizarStatus = (req, res) => {

    pedidoModel.atualizarStatus(
        req.params.id,
        req.body,
        (err) => {
    
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensagem: "Status atualizado com sucesso!"
        });

        }
    
    );

};

const excluir = (req, res) => {

    pedidoModel.excluirPedido(
        req.params.id,
        (err) => {
        
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensagem: "Pedido excluído com sucesso!"
            });

    });

};

module.exports = {
listar,
buscarPorId,
criar,
atualizarStatus,
excluir
};