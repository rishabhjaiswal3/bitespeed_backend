const express = require('express');
const cors = require('cors');
const router = require('./src/routes.js');
const {DBCreation} = require('./src/service');

const app = express();


app.use(cors());
app.use(express.json());
app.use('/',router);

app.listen(3000, async ()=> {
    console.log("system is runninng on localhost 3000")
    await DBCreation();
})