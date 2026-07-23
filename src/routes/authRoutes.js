const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *       401:
 *         description: E-mail ou senha inválidos.
 */

router.post("/login", authController.login);

module.exports = router;