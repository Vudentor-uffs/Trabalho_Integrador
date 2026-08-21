const express = require('express');

const app = express();
app.use(express.json()); 

const PORTA = 3105; 

const pessoaRouter = require('./pessoa/pessoa-routes');

app.listen(PORTA, () => {
    console.log('Servidor rodando no endereço http://localhost:' + PORTA);
}); 

app.use('/api/pessoa', helloworldRouter);

