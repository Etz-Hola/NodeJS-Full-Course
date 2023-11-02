const express = require('express')
const router = express.Router()
const path = require('path')
// const router = require('./subdir')
 
router.get('^/$|/index(.html)?', (req, res) => {                        //Makes it dynamic to either use .html or not in our address
    res.sendFile(path.join(__dirname, '..', "views", "index.html"))
})

router.get('/new-page(.html)?', (req, res) => {                            //Makes it dynamic to either use .html or not in our address
    res.sendFile(path.join(__dirname, '..', "views", "new-page.html"))
})

router.get('/testing(.html)?', (req, res) => {
    res.redirect(301, "new-page.html")
})

module.exports = router