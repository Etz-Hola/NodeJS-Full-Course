const express = require('express')
const app = express()
const path = require('path');
const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.sendFile('/views/index.html', {root: __dirname})
// })                   

            //OR

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "index.html"))
// })

             //OR

// app.get('^/$|/index.html', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "index.html"))
// })
            //OR
            
app.get('^/$|/index(.html)?', (req, res) => {                        //Makes it dynamic to either use .html or not in our address
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

// app.get('/new-page', (req, res) => {
//     res.sendFile('/views/new-page.html', {root: __dirname})
// })

            //OR

app.get('/new-page(.html)?', (req, res) => {                            //Makes it dynamic to either use .html or not in our address
    res.sendFile('/views/new-page.html', {root: __dirname})
})

// app.get('/testing', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'testing.html'))
// })


//   ********************************************//Redirecting***********************************************

// app.get('/old-page(.html)?', (req, res) => {
//     res.redirect(path.join(__dirname, 'views', 'new-page.html'))
// })

            //OR
// app.get('/testing(.html)?', (req, res) => {
//     res.redirect(path.join(__dirname, "views", "new-page.html"))
// })

            //OR
app.get('/testing(.html)?', (req, res) => {
    res.redirect(301, "new-page.html")
})
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, "new-page.html")
})



//********************************ROUTE HANDLER***************************************
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Hmm we are kuku moving');
    next()
}, (req, res) => {
    res.send('Hey Boss, how una dey?')
})


// ***********************Chaining Route Handler**********************************
const cohort1 = (req, res, next) => {
    console.log('Kanas Qodri');
    next()
}
const cohort2 = (req, res, next) => {
    console.log('Muhammad Rocco');
    next()
}
const cohort3 = (req, res, next) => {
    console.log('Muhammad KennyMax');
    next()
}
const cohort4 = (req, res) => {
    console.log('Supreme HaliahFather');
    res.send('Dem be guru in Tech')
}

app.get('/big-devs(.html)?', [cohort1, cohort2, cohort3, cohort4])

app.get('/*', (req, res) => {                                   //Error 404 page
    res.sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))

