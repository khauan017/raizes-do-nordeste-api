const express = require("express");
const router = express.Router();

const pagamentoController = require("../controllers/pagamentoController");
const verificarToken = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Pagamentos
 *   description: Gerenciamento de pagamentos
 */

/**
 * @swagger
 * /pagamentos:
 *   post:
 *     summary: Criar um pagamento
 *     tags: [Pagamentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pedido_id
 *               - forma_pagamento
 *             properties:
 *               pedido_id:
 *                 type: integer
 *                 example: 1
 *               forma_pagamento:
 *                 type: string
 *                 example: CARTAO
 *     responses:
 *       201:
 *         description: Pagamento criado com sucesso
 */
router.post("/", verificarToken, pagamentoController.criar);

/**
 * @swagger
 * /pagamentos:
 *   get:
 *     summary: Listar os pagamentos
 *     tags: [Pagamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pagamentos
 */
router.get("/", verificarToken, pagamentoController.listar);

/**
 * @swagger
 * /pagamentos/{id}:
 *   get:
 *     summary: Buscar pagamento por ID
 *     tags: [Pagamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pagamento encontrado
 *       404:
 *         description: Pagamento não encontrado
 */
router.get("/:id", verificarToken, pagamentoController.buscarPorId);

/**
 * @swagger
 * /pagamentos/{id}/confirmar:
 *   put:
 *     summary: Confirmar pagamento
 *     tags: [Pagamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pagamento confirmado com sucesso
 */
router.put("/:id/confirmar", verificarToken, pagamentoController.confirmar);

module.exports = router;