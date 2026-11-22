const dashboardRepository = require("./dashboard.repository");

async function verDadosDashboard() {
    return dashboardRepository.buscarDados();
}

module.exports = { verDadosDashboard };