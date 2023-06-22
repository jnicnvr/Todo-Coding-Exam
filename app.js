require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8005
const logger = require('./middleware/logger2')

app.use(bodyParser.json())
app.use(logger.requestLoggerMiddleware);
require('./routes/route.svc')(app)

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})


module.exports = app;