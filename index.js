const express = require('express');

const app = express();
app.use(express.json()); 

const PORTA = 3105; 

const helloworldRouter = require('./hello-world/helloworld-routes');

app.listen(PORTA, () => {
    console.log('Servidor rodando no endereço http://localhost:' + PORTA);
}); 

app.use('/api/helloworld', helloworldRouter);

app.get('/', (req, res) => {
    res.status(200).json({mensagem: "API de integração do trabalho integrador."}); 
});