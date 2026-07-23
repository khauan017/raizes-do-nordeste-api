const express = require("express");

const router = express.Router();

const estoqueController = require("../controllers/estoqueController");

/**
 * @swagger
 * /estoque:
 *   post:
 *     summary: Cadastra um item no estoque
 *     tags:
 *       - Estoque
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Item cadastrado.
 */
router.post("/", estoqueController.criar);

/**
 * @swagger
 * /estoque:
 *   get:
 *     summary: Lista o estoque
 *     tags:
 *       - Estoque
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista do estoque.
 */
router.get("/", estoqueController.listar);

/**
 * @swagger
 * /estoque/{id}:
 *   get:
 *     summary: Busca item do estoque por ID
 *     tags:
 *       - Estoque
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
router.get("/:id", estoqueController.buscarPorId);

/**
 * @swagger
 * /estoque/entrada/{id}:
 *   put:
 *     summary: Entrada de produtos no estoque
 *     tags:
 *       - Estoque
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
 *         description: Entrada registrada.
 */
router.put("/entrada/:id", estoqueController.entrada);

/**
 * @swagger
 * /estoque/saida/{id}:
 *   put:
 *     summary: Saída de produtos do estoque
 *     tags:
 *       - Estoque
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
 *         description: Saída registrada.
 */
router.put("/saida/:id", estoqueController.saida);

/**
 * @swagger
 * /estoque/{id}:
 *   delete:
 *     summary: Exclui um item do estoque
 *     tags:
 *       - Estoque
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
 *         description: Item excluído.
 */
router.delete("/:id", estoqueController.excluir);

module.exports = router;