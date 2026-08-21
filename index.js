const express = require('express');

const app = express();
app.use(express.json()); 

const PORTA = 3105; 

const adminRouter = require('./admin/admin-routes');

app.listen(PORTA, () => {
    console.log('Servidor rodando no endereço http://localhost:' + PORTA);
});

app.use('/api/admin', adminRouter);

app.use('/api/pessoa', helloworldRouter);

