const express = require("express");

const router = express.Router();

const pedidoController = require("../controllers/pedidoController");

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos.
 */
router.get("/", pedidoController.listar);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Busca um pedido pelo ID
 *     tags:
 *       - Pedidos
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
 *         description: Pedido encontrado.
 */
router.get("/:id", pedidoController.buscarPorId);

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pedido criado.
 */
router.post("/", pedidoController.criar);

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cliente_id
 *               - unidade_id
 *               - canal_pedido
 *             properties:
 *               cliente_id:
 *                 type: integer
 *                 example: 1
 *               unidade_id:
 *                 type: integer
 *                 example: 1
 *               canal_pedido:
 *                 type: string
 *                 example: WEB
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso.
 */
router.put("/status/:id", pedidoController.atualizarStatus);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Exclui um pedido
 *     tags:
 *       - Pedidos
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
 *         description: Pedido excluído.
 */
router.delete("/:id", pedidoController.excluir);

module.exports = router;

