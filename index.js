const express = require("express");
const empresaRoutes = require("./src/empresa/empresa.routes");
const clienteRoutes = require("./src/cliente/cliente.routes");
const contratoRoutes = require("./src/contrato/contrato.routes");
const authRoutes = require("./src/auth/auth.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(empresaRoutes);
app.use(clienteRoutes);
app.use(contratoRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


