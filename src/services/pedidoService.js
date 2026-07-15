const pedidoModel = require("../models/pedidoModel");

const criarPedido = (pedido, callback) => {

    pedidoModel.criarPedido(
        pedido,
        callback
    );

};

module.exports = {
    criarPedido
};