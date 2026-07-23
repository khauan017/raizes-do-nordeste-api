const express = require("express");
const router = express.Router();

const fidelidadeController = require("../controllers/fidelidadeController");
const verificarToken = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Fidelidade
 *   description: Programa de Fidelidade
 */

/**
 * @swagger
 * /fidelidade/{clienteId}:
 *   get:
 *     summary: Consultar saldo de pontos
 *     tags: [Fidelidade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Saldo encontrado
 */
router.get(
    "/:clienteId",
    verificarToken,
    fidelidadeController.consultarSaldo
);

/**
 * @swagger
 * /fidelidade/{clienteId}/historico:
 *   get:
 *     summary: Consultar histórico de pontos
 *     tags: [Fidelidade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico encontrado
 */
router.get(
    "/:clienteId/historico",
    verificarToken,
    fidelidadeController.consultarHistorico
);

module.exports = router;