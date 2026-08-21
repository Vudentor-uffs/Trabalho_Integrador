const express = require('express');

const router = express.Router();

router.get("/admin", (req, res) => {
    res.status(200).json({mensagem: "Rota de administração."}); 
})

module.exports = router;