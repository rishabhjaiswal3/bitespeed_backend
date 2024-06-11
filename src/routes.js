const express = require('express');
const router = express.Router();
const {insertion} = require('./service');


// normal route
router.get("/", (req,res) => {
    res.send({status:200,data:`Receive Request for normal route`})
})

router.post("/orders", async (req,res) => {
    const {email,phoneNumber} = req.body;
    console.log('my email is ',email, ' and phone number is ',phoneNumber);
    const data = await insertion(email,phoneNumber);

    res.send({status:200,data})  
})

module.exports = router;