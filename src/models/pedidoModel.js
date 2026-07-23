const db = require("../config/database");

const listarPedidos = (callback) => {

    const sql = `
        SELECT
            pedidos.id,
            pedidos.cliente_id,
            pedidos.unidade_id,
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
            pedidos.cliente_id,
            pedidos.unidade_id,
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

const atualizarStatus = (id, status, callback) => {g

    const sql = `
        UPDATE pedidos
        SET status = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [status, id],
        callback
    );

};

const atualizarValorTotal = (pedidoId, callback) => {

    const sql = `
        UPDATE pedidos
        SET valor_total = (
            SELECT COALESCE(SUM(subtotal), 0)
            FROM itens_pedido
            WHERE pedido_id = ?
        )
        WHERE id = ?;
    `;

    db.query(
        sql,
        [pedidoId, pedidoId],
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
atualizarValorTotal,
excluirPedido
};
