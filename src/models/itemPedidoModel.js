const db = require("../config/database");

const listarItens = (callback) => {

    const sql = `
        SELECT
            itens_pedido.id,
            itens_pedido.pedido_id,
            produtos.nome AS produto,
            itens_pedido.quantidade,
            itens_pedido.preco_unitario,
            itens_pedido.subtotal
        FROM itens_pedido

        INNER JOIN produtos
            ON itens_pedido.produto_id = produtos.id
    `;

    db.query(sql, callback);

};

const buscarItemPorId = (id, callback) => {

    const sql = `
        SELECT
            itens_pedido.id,
            itens_pedido.pedido_id,
            produtos.nome AS produto,
            itens_pedido.quantidade,
            itens_pedido.preco_unitario,
            itens_pedido.subtotal
        FROM itens_pedido

        INNER JOIN produtos
            ON itens_pedido.produto_id = produtos.id

        WHERE itens_pedido.id = ?;
    `;

    db.query(sql, [id], callback);

};

const criarItem = (item, callback) => {

    const sql = `
    INSERT INTO itens_pedido
    (pedido_id, produto_id, quantidade, preco_unitario, subtotal)
    VALUES (?, ?, ?, ?, ?)
`;

    db.query(
        sql,
        [
            item.pedido_id,
            item.produto_id,
            item.quantidade,
            item.preco_unitario,
            item.subtotal
        ],
        callback
    );

};

const excluirItem = (id, callback) => {

    db.query(
        "DELETE FROM itens_pedido WHERE id = ?",
        [id],
        callback
    );

};

module.exports = {
    listarItens,
    buscarItemPorId,
    criarItem,
    excluirItem
};