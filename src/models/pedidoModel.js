const db = require("../config/database");

const listarPedidos = (callback) => {

    const sql = `
        SELECT
            pedidos.id,
            usuarios.nome AS cliente,
            unidades.nome AS unidade,
            pedidos.valor_total,
            pedidos.status,
            pedidos.data_criacao
        FROM pedidos

         INNER JOIN usuarios
            ON pedidos.cliente_id = usuarios.id

        INNER JOIN unidades
            ON pedidos.unidade_id = unidades.id
     `;

        db.query(sql, callback);

};

const buscarPedidoPorId = (id, callback) => {

    const sql = `
        SELECT
            pedidos.id,
            usuarios.nome AS cliente,
            unidades.nome AS unidade,
            pedidos.valor_total,
            pedidos.status,
            pedidos.data_criacao
        FROM pedidos

         INNER JOIN usuarios
            ON pedidos.cliente_id = usuarios.id

        INNER JOIN unidades
            ON pedidos.unidade_id = unidades.id
        
        WHERE pedidos.id = ?;
     `;

    db.query(sql, [id], callback);

};

const criarPedido = (pedido, callback) => {

    const sql = `
        INSERT INTO pedidos
        (cliente_id, unidade_id, canal_pedido)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            pedido.cliente_id,
            pedido.unidade_id,
            pedido.canal_pedido
        ],
        callback
    );

};

const atualizarStatus = (id, pedido, callback) => {

    const sql = `
        UPDATE pedidos
        SET
            status = ?
        WHERE id = ?
    `;

    db.query(
            sql,
            [
                pedido.status,
                id
            ],
            callback
        );


};

const excluirPedido = (id, callback) => {

    db.query(
        "DELETE FROM pedidos WHERE id = ?",
        [id],
        callback
    );

};


module.exports = {
listarPedidos,
buscarPedidoPorId,
criarPedido,
atualizarStatus,
excluirPedido,
};
