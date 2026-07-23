const fidelidadeService = require("../services/fidelidadeService");

// Consultar saldo
const consultarSaldo = (req, res) => {

    fidelidadeService.consultarSaldo(
        req.params.clienteId,
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    mensagem: "Erro ao consultar saldo."
                });
            }

            res.json(results[0]);

        }
    );

};

// Consultar histórico
const consultarHistorico = (req, res) => {

    fidelidadeService.consultarHistorico(
        req.params.clienteId,
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    mensagem: "Erro ao consultar histórico."
                });
            }

            res.json(results);

        }
    );

};

module.exports = {
    consultarSaldo,
    consultarHistorico
};