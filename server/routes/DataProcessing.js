const express = require('express');
const path = require('path');
const fs = require('fs');
const appDir = path.dirname(require.main.filename);
const router = express.Router();

router.post('/getData', (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync('./database/simple-data.json', 'utf8') || {"dumy":[]}) ;
    res.send(jsonData.dumy || []);
});

router.post('/saveData', (req,res) => {
    res.send('not save');
});

router.post('/updateData', (req, res) => {
    let data = req.body.data.dumy;
    let jsonData = JSON.parse(fs.readFileSync('./database/simple-data.json', 'utf8')) ;
    jsonData.dumy = data;
    fs.writeFileSync('./database/simple-data.json', JSON.stringify(jsonData), 'utf8');

    res.send('not save');
});

router.get('/test', (req,res) => {

    res.send('not save');
});
 

module.exports = router;