const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const estoqueRoutes = require("./routes/estoqueRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const verificarToken = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usuarios", verificarToken, usuarioRoutes);
app.use("/produtos", verificarToken, produtoRoutes);
app.use("/estoque", verificarToken, estoqueRoutes);
app.use("/pedidos", verificarToken, pedidoRoutes);

app.get("/", (req, res) => {
    res.json({
        sistema: "Raízes do Nordeste",
        status: "API funcionando"
    });
});

module.exports = app;

