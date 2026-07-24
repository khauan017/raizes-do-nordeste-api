const pagamentoModel = require("../models/pagamentoModel");
const pedidoModel = require("../models/pedidoModel");
const fidelidadeService = require("./fidelidadeService");

const criarPagamento = (dados, callback) => {

    pedidoModel.buscarPedidoPorId(dados.pedido_id, (err, results) => {

        if (err) return callback(err);

        if (results.length === 0) {
            return callback({
                status: 404,
                mensagem: "Pedido não encontrado."
            });
        }

        pagamentoModel.buscarPagamentoPorPedido(dados.pedido_id, (err, pagamento) => {

            if (err) return callback(err);

            if (pagamento.length > 0) {
                return callback({
                    status: 400,
                    mensagem: "Já existe um pagamento para este pedido."
                });
            }

            const pedido = results[0];

            const novoPagamento = {
                pedido_id: dados.pedido_id,
                forma_pagamento: dados.forma_pagamento,
                status_pagamento: "PENDENTE",
                valor: pedido.valor_total
            };

            pagamentoModel.criarPagamento(novoPagamento, callback);

        });

    });

};

// Analisar e confirmar o pagamento 
const confirmarPagamento = (id, callback) => {

    pagamentoModel.buscarPagamentoPorId(id, (err, results) => {

        if (err) return callback(err);

        if (results.length === 0) {
            return callback({
                status: 404,
                mensagem: "Pagamento não encontrado."
            });
        }

        const pagamento = results[0];

        if (pagamento.status_pagamento === "APROVADO") {
            return callback({
                status: 400,
                mensagem: "Pagamento já foi confirmado."
    });
};

        pagamentoModel.confirmarPagamento(id, (err) => {

            if (err) return callback(err);

            pedidoModel.atualizarStatus(
                pagamento.pedido_id,
                "PAGO",
                (err) => {

                    if (err) return callback(err);

                    fidelidadeService.creditarPontos(
                        pagamento.pedido_id,
                        (err) => {

                            if (err) return callback(err);

                            callback(null, {
                                mensagem: "Pagamento confirmado e pontos creditados com sucesso!"
                            });

                    }
                );

            });

        });

    });

};

module.exports = {
    criarPagamento,
    confirmarPagamento
};