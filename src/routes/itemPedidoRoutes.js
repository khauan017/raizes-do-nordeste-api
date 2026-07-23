const express = require("express");

const router = express.Router();

const itemPedidoController = require("../controllers/itemPedidoController");

/**
 * @swagger
 * /itens-pedido:
 *   get:
 *     summary: Lista todos os itens dos pedidos
 *     tags:
 *       - Itens do Pedido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de itens.
 */
router.get("/", itemPedidoController.listar);

/**
 * @swagger
 * /itens-pedido/{id}:
 *   get:
 *     summary: Busca um item do pedido pelo ID
 *     tags:
 *       - Itens do Pedido
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
 *         description: Item encontrado.
 */
router.get("/:id", itemPedidoController.buscarPorId);

/**
 * @swagger
 * /itens-pedido:
 *   post:
 *     summary: Adiciona um item ao pedido
 *     tags:
 *       - Itens do Pedido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Item adicionado ao pedido.
 */
router.post("/", itemPedidoController.criar);

/**
 * @swagger
 * /itens-pedido:
 *   post:
 *     summary: Adiciona um item ao pedido
 *     tags:
 *       - Itens do Pedido
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
 *               - produto_id
 *               - quantidade
 *               - preco_unitario
 *               - subtotal
 *             properties:
 *               pedido_id:
 *                 type: integer
 *                 example: 1
 *               produto_id:
 *                 type: integer
 *                 example: 1
 *               quantidade:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item adicionado ao pedido com sucesso.
 *       401:
 *         description: Token não informado ou inválido.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post("/", itemPedidoController.criar);
router.delete("/:id", itemPedidoController.excluir);

module.exports = router;