const database = require("../config/database");

const buscarFidelidade = (clienteId, callback) => {

    const sql = `
        SELECT *
        FROM fidelidade
        WHERE cliente_id = ?;
    `;

    database.query(sql, [clienteId], callback);

};

const criarFidelidade = (clienteId, callback) => {

    const sql = `
        INSERT INTO fidelidade (cliente_id, pontos)
        VALUES (?, 0);
    `;

    database.query(sql, [clienteId], callback);

};

const adicionarPontos = (clienteId, pontos, callback) => {

    const sql = `
        UPDATE fidelidade
        SET pontos = pontos + ?
        WHERE cliente_id = ?;
    `;

    database.query(sql, [pontos, clienteId], callback);

};

const registrarHistorico = (dados, callback) => {

    const sql = `
        INSERT INTO historico_fidelidade
        (
            cliente_id,
            pedido_id,
            pontos,
            tipo,
            descricao
        )
        VALUES (?, ?, ?, ?, ?);
    `;

    database.query(
        sql,
        [
            dados.cliente_id,
            dados.pedido_id,
            dados.pontos,
            dados.tipo,
            dados.descricao
        ],
        callback
    );

};

const listarHistorico = (clienteId, callback) => {

    const sql = `
        SELECT *
        FROM historico_fidelidade
        WHERE cliente_id = ?
        ORDER BY data_movimentacao DESC;
    `;

    database.query(sql, [clienteId], callback);

};

module.exports = {
    buscarFidelidade,
    criarFidelidade,
    adicionarPontos,
    registrarHistorico,
    listarHistorico
};