const pagamentoService = require("../services/pagamentoService");
const pagamentoModel = require("../models/pagamentoModel");

const criar = (req, res) => {

    pagamentoService.criarPagamento(req.body, (err, result) => {

        if (err) {
            return res.status(err.status || 500).json({
                mensagem: err.mensagem || "Erro ao criar pagamento."
            });
        }

        res.status(201).json({
            mensagem: "Pagamento criado com sucesso!",
            resultado: result
        });

    });

};

// Listar os pagamentos
const listar = (req, res) => {

    pagamentoModel.listarPagamentos((err, results) => {

        if (err) {
            return res.status(500).json({
                mensagem: "Erro ao listar pagamentos."
            });
        }

        res.json(results);

    });

};

// Buscar o pagamento pelo id
const buscarPorId = (req, res) => {

    pagamentoModel.buscarPagamentoPorId(req.params.id, (err, results) => {

        if (err) {
            return res.status(500).json({
                mensagem: "Erro ao buscar pagamento."
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                mensagem: "Pagamento não encontrado."
            });
        }

        res.json(results[0]);

    });

};

// Confirmar pagamento
const confirmar = (req, res) => {

    pagamentoService.confirmarPagamento(req.params.id, (err, result) => {

        if (err) {
            return res.status(err.status || 500).json({
                mensagem: err.mensagem || "Erro ao confirmar pagamento."
            });
        }

        res.json(result);

    });

};

module.exports = {
    criar,
    listar,
    buscarPorId,
    confirmar
};