const fidelidadeModel = require("../models/fidelidadeModel");
const pedidoModel = require("../models/pedidoModel");

// Consultar saldo
const consultarSaldo = (clienteId, callback) => {

    fidelidadeModel.buscarFidelidade(clienteId, (err, results) => {

        if (err) return callback(err);

        if (results.length === 0) {

            return fidelidadeModel.criarFidelidade(
                clienteId,
                (err) => {

                    if (err) return callback(err);

                    fidelidadeModel.buscarFidelidade(
                        clienteId,
                        callback
                    );

                }
            );

        }

        callback(null, results);

    });

};

// Creditar pontos
const creditarPontos = (pedidoId, callback) => {

    pedidoModel.buscarPedidoPorId(
        pedidoId,
        (err, results) => {

            if (err) return callback(err);

            if (results.length === 0) {
                return callback({
                    status: 404,
                    mensagem: "Pedido não encontrado."
                });
            }

            const pedido = results[0];

            // 1 ponto por real gasto
            const pontos = Math.floor(Number(pedido.valor_total));

            consultarSaldo(
                pedido.cliente_id,
                (err) => {

                    if (err) return callback(err);

                    fidelidadeModel.adicionarPontos(
                        pedido.cliente_id,
                        pontos,
                        (err) => {

                            if (err) return callback(err);

                            fidelidadeModel.registrarHistorico(
                                {
                                    cliente_id: pedido.cliente_id,
                                    pedido_id: pedido.id,
                                    pontos,
                                    tipo: "ENTRADA",
                                    descricao: "Compra realizada"
                                },
                                callback
                            );

                        }
                    );

                }
            );

        }
    );

};

// Histórico
const consultarHistorico = (clienteId, callback) => {

    fidelidadeModel.listarHistorico(
        clienteId,
        callback
    );

};

module.exports = {
    consultarSaldo,
    creditarPontos,
    consultarHistorico
};