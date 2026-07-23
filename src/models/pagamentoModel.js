const db = require("../config/database");

// Listar todos os pagamentos
const listarPagamentos = (callback) => {
    const sql = `
        SELECT
            pagamentos.id,
            pagamentos.pedido_id,
            pagamentos.forma_pagamento,
            pagamentos.status_pagamento,
            pagamentos.valor,
            pagamentos.data_pagamento
        FROM pagamentos
        ORDER BY pagamentos.id;
    `;

    db.query(sql, callback);
};

// Buscar pagamento pelo id 
const buscarPagamentoPorId = (id, callback) => {
    const sql = `
        SELECT
            pagamentos.id,
            pagamentos.pedido_id,
            pagamentos.forma_pagamento,
            pagamentos.status_pagamento,
            pagamentos.valor,
            pagamentos.data_pagamento
        FROM pagamentos
        WHERE pagamentos.id = ?;
    `;

    db.query(sql, [id], callback);
};

// Buscar pagamento pelo pedido
const buscarPagamentoPorPedido = (pedidoId, callback) => {
    const sql = `
        SELECT *
        FROM pagamentos
        WHERE pedido_id = ?;
    `;

    db.query(sql, [pedidoId], callback);
};

// Criar pagamento
const criarPagamento = (pagamento, callback) => {

    const sql = `
        INSERT INTO pagamentos
        (pedido_id, forma_pagamento, status_pagamento, valor)
        VALUES (?, ?, ?, ?);
    `;

    db.query(
        sql,
        [
            pagamento.pedido_id,
            pagamento.forma_pagamento,
            pagamento.status_pagamento,
            pagamento.valor
        ],
        callback
    );
};

// Confirmar pagamento
const confirmarPagamento = (id, callback) => {

    const sql = `
        UPDATE pagamentos
        SET status_pagamento = 'APROVADO'
        WHERE id = ?;
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    listarPagamentos,
    buscarPagamentoPorId,
    buscarPagamentoPorPedido,
    criarPagamento,
    confirmarPagamento
};