const itemPedidoModel = require("../models/itemPedidoModel");
const produtoModel = require("../models/produtoModel");
const pedidoModel = require("../models/pedidoModel");

const criarItem = (dados, callback) => {

    produtoModel.buscarProdutoPorId(dados.produto_id, (err, results) => {

        if (err) {
            return callback(err);
        }

        if (results.length === 0) {
            return callback({
                mensagem: "Produto não encontrado."
            });
        }


    const produto = results[0];

    const preco = Number(produto.preco);

    const item = {
        pedido_id: dados.pedido_id,
        produto_id: dados.produto_id,
        quantidade: dados.quantidade,
        preco_unitario: preco,
        subtotal: preco * dados.quantidade
    };
        itemPedidoModel.criarItem(item, (err) => {

            if (err) {
                return callback(err);
            }

            pedidoModel.atualizarValorTotal(item.pedido_id, (err) => {

                if (err) {
                    return callback(err);
                }

                callback(null);

            });

        });

    });

};

module.exports = {
    criarItem
};