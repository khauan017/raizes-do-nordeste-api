const express = require("express");

const router = express.Router();

const estoqueController = require("../controllers/estoqueController");

router.post("/", estoqueController.criar);
router.get("/", estoqueController.listar);
router.get("/:id", estoqueController.buscarPorId);
router.put("/entrada/:id", estoqueController.entrada);
router.put("/saida/:id", estoqueController.saida);
router.delete("/:id", estoqueController.excluir);

module.exports = router;