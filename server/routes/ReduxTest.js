const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const localStorage = {
    dumyList : [
        {
            title: "Dumy1",
            content : "Dumy1 Content"
        },{
            title: "Dumy2",
            content : "Dumy2 Content"
        },{
            title: "Dumy3",
            content : "Dumy3 Content"
        },
    ]
}

router.post('/getData', (req, res) => {
    res.send(localStorage.dumyList);
});

module.exports = router;