const express = require('express');
const app = express();

app.get('/', (req,res,next) =>{
    res.send({hi: 'there'});
    console.log("Home page viewed")
});

const port = process.env.PORT || 5000;
app.listen(port);