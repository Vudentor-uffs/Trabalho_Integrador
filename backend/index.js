const express = require("express");
const empresaRoutes = require("./src/empresa/empresa.routes");
const clientes_pfRoutes = require("./src/clientes_pf/clientes_pf.routes");
const clientes_pjRoutes = require("./src/clientes_pj/clientes_pj.routes");
const contratosRoutes = require("./src/contratos/contratos.routes");
const authRoutes = require("./src/auth/auth.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(empresaRoutes);
app.use(clientes_pfRoutes);
app.use(clientes_pjRoutes);
app.use(contratosRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


