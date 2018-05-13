const express = require('express');
const app = express();

app.get('/', (req,res,next) =>{
    res.send({hi: 'there'});
    console.log("Home page viewed")
});

app.listen(PROCESS.ENV.port || 5000);