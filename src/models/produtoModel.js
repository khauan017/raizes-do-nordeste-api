const db = require("../config/database");

const listarProdutos = (callback) => {

    db.query(
        "SELECT * FROM produtos",
        callback
    );

};

const buscarProdutoPorId = (id, callback) => {

    db.query(
        "SELECT * FROM produtos WHERE id = ?",
        [id],
        callback
    );

};

const criarProduto = (produto, callback) => {

    const sql = `
        INSERT INTO produtos
        (nome, descricao, preco, categoria, ativo)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            produto.nome,
            produto.descricao,
            produto.preco,
            produto.categoria,
            produto.ativo
        ],
        callback
    );

};

const atualizarProduto = (id, produto, callback) => {

    const sql = `
        UPDATE produtos
        SET
            nome = ?,
            descricao = ?,
            preco = ?,
            categoria = ?,
            ativo = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            produto.nome,
            produto.descricao,
            produto.preco,
            produto.categoria,
            produto.ativo,
            id
        ],
        callback
    );

};

const excluirProduto = (id, callback) => {

    db.query(
        "DELETE FROM produtos WHERE id = ?",
        [id],
        callback
    );

};

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    excluirProduto
};