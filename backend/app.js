const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
const mensajes = require('./data/mensajes.json')

app.use(cors())

app.get('/getMensaje', (req, res) => {
    const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)]
    res.json(mensaje)
})


app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})