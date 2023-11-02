const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3000;

// const {router} = require('./routes/subdir')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Static Routes
app.use('/', express.static(path.join(__dirname, "public")));               //Apply static files

 
app.use('/', require('./routes/root'))
app.use('/employees', require('./routes/api/employees'))

app.use(logger)


app.use(cors(corsOptions))


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

 