require('dotenv').config()
require('./mongo.js')
const User = require('./models/User.js')
const express = require('express')
const cors = require('cors')
const app = express()
const process = require('process')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/api/users', (req, res) => {
    User.find({})
        .then(user => {
            res.status(200).json(user).end()
        })
        .catch(error => {
            res.status(401).json({error: error}).end()
        })
})
app.delete('/api/users/:id', (req, res, next) => {
    const id = req.params.id
    if (!id) {
        return res.status(401).send({error: "The ID we got it's invalid/doesn't exist"}).end()
    }
    User.findByIdAndDelete(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        next(error)
    })
})

app.post('/api/users', (req, res) => {
    const userInfo = req.body
    if (!userInfo) {
        return res.json({error: "No se envió la información"})
    }
    const nuevoUsuario = new User({
        name: userInfo.name,
        lastName: userInfo.lastname,
        username: userInfo.username,
        password: userInfo.password,
        sales: [],
        weeklyGoal: userInfo.weeklygoal
    })
    nuevoUsuario.save()
    .then(response => {
        res.status(201).json(response).end()
    })
    .catch(error => {
        res.status(401).json({error: error.message}).end()
    })
})
app.use((error, req, res, next) => {
    if (error.name === "CastError") {
        return res.status(400).send({error: "Hubo un error con la ID recibida"}).end()
    } else {
        next()
    }
})
app.use((req, res) => {
    res.status(404).json({error: "No encontrado"}).end()
}, )
const PORT = process.env.PORT
app.listen(PORT)
console.log('Servidor iniciado.')