const express = require('express')
const http = require('http');
const cors = require('cors');
const multer = require('multer');

// -- LOCAL IMPORTS --
const { parsePayload } = require('./utils/plexUtils.js')
const sql = require('./utils/sqlLiteUtils')
const {addLog} = require("./utils/utils");

const configs = require(`${process.cwd()}/configs/config.json` )
const tables = require(`${process.cwd()}/configs/tables.json`)

const app = express()

app.use(cors());
cors({
    origin: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'Origin', 'Host', 'Connection', 'Accept-Encoding', 'Accept-Language', 'Cookie'],
    credentials: false
});
/** DEFAULT RESPONSE */
const JSON_RESPONSE = {
    status: 200,
    msg: "OK"
}

app.use(function (req, res, next){
    console.log("request", `${req.method} - ${req.url}`)
    next()
})

app.get('/', (content, response)=>{
    console.log('GET', content.query)
    response.status(200).json(JSON_RESPONSE)
})

app.post('/', multer().none(), (content, response)=>{
    const myPayload = parsePayload(content.body.payload)
    //SEND CURRENT STATUS ON DB TABLE AND LOG
    addLog(myPayload)
    response.status(200).json(JSON_RESPONSE)
})

/** HTTP Server */
http.createServer(app).listen(configs.app.port, () => {
    console.log(`HTTP: App is running on port ${configs.app.port}` )
    tables.tables.forEach(table=>{
        sql.createTable(table.name, table.columns)
    })
})
