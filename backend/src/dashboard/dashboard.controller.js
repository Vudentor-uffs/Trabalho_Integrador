const dashboardService = require("./dashboard.service");

async function verDashboard(req, res) {
    try {
        const dados = await dashboardService.verDadosDashboard();
        return res.status(200).json(dados);
    } catch (erro) {
        console.log("Erro ao carregar dashboard:", erro);
        return res.status(500).json({ erro: "Não foi possível carregar os dados do dashboard." });
    }
}

module.exports = { verDashboard };