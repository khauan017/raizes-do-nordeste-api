const db = require("../config/database");

const listarUsuarios = (callback) => {
    db.query(
        "SELECT id, nome, email, perfil, data_cadastro FROM usuarios",
        callback
    );
};

const buscarUsuarioPorId = (id, callback) => {
    db.query(
        "SELECT id, nome, email, perfil, data_cadastro FROM usuarios WHERE id = ?",
        [id],
        callback
    );
};

const criarUsuario = (usuario, callback) => {

    const sql = `
        INSERT INTO usuarios
        (nome, email, senha, perfil)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            usuario.nome,
            usuario.email,
            usuario.senha,
            usuario.perfil
        ],
        callback
    );
};

const atualizarUsuario = (id, usuario, callback) => {

    const sql = `
        UPDATE usuarios
        SET
            nome = ?,
            email = ?,
            perfil = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            usuario.nome,
            usuario.email,
            usuario.perfil,
            id
        ],
        callback
    );
};

const excluirUsuario = (id, callback) => {

    db.query(
        "DELETE FROM usuarios WHERE id = ?",
        [id],
        callback
    );
};

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario
};

