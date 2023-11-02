const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3000;
// const {router} = require('./routes/subdir')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Static Routes

app.use('/', express.static(path.join(__dirname, "public")));               //Apply static files
app.use('/subdir', express.static(path.join(__dirname, "/public")))         //Apply static files

 
app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees'))

app.use(logger)

const whitelist = ['https://www.yourdomain.com', 'http://127.0.0.1:3000', 'http://localhost:3100']

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORs'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

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
            
// app.get('^/$|/index(.html)?', (req, res) => {                        //Makes it dynamic to either use .html or not in our address
//     res.sendFile(path.join(__dirname, "views", "index.html"))
// })

// // app.get('/new-page', (req, res) => {
// //     res.sendFile('/views/new-page.html', {root: __dirname})
// // })

//             //OR

// app.get('/new-page(.html)?', (req, res) => {                            //Makes it dynamic to either use .html or not in our address
//     res.sendFile('/views/new-page.html', {root: __dirname})
// })

// // app.get('/testing', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'views', 'testing.html'))
// // })


// //   ********************************************//Redirecting***********************************************

// // app.get('/old-page(.html)?', (req, res) => {
// //     res.redirect(path.join(__dirname, 'views', 'new-page.html'))
// // })

//             //OR
// // app.get('/testing(.html)?', (req, res) => {
// //     res.redirect(path.join(__dirname, "views", "new-page.html"))
// // })

//             //OR
// app.get('/testing(.html)?', (req, res) => {
//     res.redirect(301, "new-page.html")
// })
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, "new-page.html")
})



// // ***********************Chaining Route Handler**********************************
// const cohort1 = (req, res, next) => {
//     console.log('Kanas Qodri');
//     next()
// }
// const cohort2 = (req, res, next) => {
//     console.log('Muhammad Rocco');
//     next()
// }
// const cohort3 = (req, res, next) => {
//     console.log('Muhammad KennyMax');
//     next()
// }
// const cohort4 = (req, res) => {
//     console.log('Supreme HaliahFather');
//     res.send('Dem be guru in Tech')
// }

// app.get('/big-devs(.html)?', [cohort1, cohort2, cohort3, cohort4])

// app.get('/*', (req, res) => {                                   //Error 404 page
//     res.sendFile(path.join(__dirname, 'views', '404.html'))
// })

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({"error": "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found")
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))

 