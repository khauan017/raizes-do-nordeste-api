const express = require("express");

const router = express.Router();

const pedidoController = require("../controllers/pedidoController");

router.get("/", pedidoController.listar);
router.get("/:id", pedidoController.buscarPorId);
router.post("/", pedidoController.criar);
router.put("/status/:id", pedidoController.atualizarStatus);
router.delete("/:id", pedidoController.excluir);

module.exports = router;

