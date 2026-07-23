const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const estoqueRoutes = require("./routes/estoqueRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const itemPedidoRoutes = require("./routes/itemPedidoRoutes");
const verificarToken = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/produtos", verificarToken, produtoRoutes);
app.use("/estoque", verificarToken, estoqueRoutes);
app.use("/pedidos", verificarToken, pedidoRoutes);
app.use("/itens-pedido", verificarToken, itemPedidoRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.get("/", (req, res) => {
    res.json({
        sistema: "Raízes do Nordeste",
        status: "API funcionando"
    });
});

module.exports = app;

