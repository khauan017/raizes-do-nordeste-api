const db = require("../config/database");

const listarEstoque = (callback) => {

    const sql = `
        SELECT
            estoque.id,
            produtos.nome AS produto,
            unidades.nome AS unidade,
            estoque.quantidade,
            estoque.ultima_atualizacao

        FROM estoque

        INNER JOIN produtos
            ON estoque.produto_id = produtos.id

        INNER JOIN unidades
            ON estoque.unidade_id = unidades.id
    `;

    db.query(sql, callback);

};

const buscarEstoquePorId = (id, callback) => {
    const sql = `
        SELECT
            estoque.id,
            produtos.nome AS produto,
            unidades.nome AS unidade,
            estoque.quantidade,
            estoque.minimo_estoque,
            estoque.ultima_atualizacao
        FROM estoque

        INNER JOIN produtos
            ON estoque.produto_id = produtos.id

        INNER JOIN unidades
            ON estoque.unidade_id = unidades.id

        WHERE estoque.id = ?;
        `;

   db.query(
    sql,
    [id],
     callback);

};
 
const criarEstoque = (estoque, callback) => {

    const sql = `
        INSERT INTO estoque
        (produto_id, unidade_id, quantidade, minimo_estoque)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            estoque.produto_id,
            estoque.unidade_id,
            estoque.quantidade,
            estoque.minimo_estoque 
        ],
        callback
    );

};

const adicionarQuantidade = (id, quantidade, callback) => {

    const sql = `
        UPDATE estoque
        SET
            quantidade = quantidade + ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
        quantidade,
        id
        ],
        callback
    );

};

const baixarQuantidade = (id, quantidade, callback) => {

    const sql = `
        UPDATE estoque
        SET
            quantidade = quantidade - ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            quantidade,
            id
        ],
        callback
    );

};

const excluirEstoque = (id, callback) => {

    db.query(
        "DELETE FROM estoque WHERE id = ?",
        [id],
        callback
    );

};

module.exports = {
    listarEstoque,
    buscarEstoquePorId,
    criarEstoque,
    adicionarQuantidade,
    baixarQuantidade,
    excluirEstoque
};