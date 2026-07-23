const usuarioModel = require("../models/usuarioModel");
const bcrypt = require("bcrypt");

const listar = (req, res) => {

    usuarioModel.listarUsuarios((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

const buscarPorId = (req, res) => {

    usuarioModel.buscarUsuarioPorId(
        req.params.id,
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado."
                });
            }

            res.json(results[0]);
        }
    );

};

const criar = async (req, res) => {

    try {

        const senhaCriptografada = await bcrypt.hash(req.body.senha, 10);

        const usuario = {
            ...req.body,
            senha: senhaCriptografada
        };

        usuarioModel.criarUsuario(
            usuario,
            (err) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.status(201).json({
                    mensagem: "Usuário criado com sucesso!"
                });

            }
        );

    } catch (err) {

        res.status(500).json({
            mensagem: "Erro ao criptografar a senha."
        });

    }

};

const atualizar = (req, res) => {

    usuarioModel.atualizarUsuario(
        req.params.id,
        req.body,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensagem: "Usuário atualizado com sucesso!"
            });
        }
    );
};

const excluir = (req, res) => {

    usuarioModel.excluirUsuario(
        req.params.id,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensagem: "Usuário excluído com sucesso!"
            });
        }
    );
};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};