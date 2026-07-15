//codigo para a execução do login//

const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");

const login = (req, res) => {

    const { email, senha } = req.body;

//erros na hora da execução//

    authModel.buscarUsuarioPorEmail(email, (err, results) => {

        if (err) {
            return res.status(500).json({
                mensagem: "Erro no servidor."
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                mensagem: "E-mail ou senha inválidos."
            });
        }

        const usuario = results[0];

        if (usuario.senha !== senha) {
            return res.status(401).json({
                mensagem: "E-mail ou senha inválidos."
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                perfil: usuario.perfil
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.json({
            mensagem: "Login realizado com sucesso!",
            token
        });

    });

};

module.exports = {
    login
};