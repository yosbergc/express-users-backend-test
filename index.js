const express = require('express');
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
let lista = [
    {
        nombre: "Emmanuel",
        apellido: "Guerrero",
        edad: 20,
        id: 1

    },
    {
        nombre: "Gregory",
        apellido: "Rojas",
        edad: 21,
        id: 2

    },
    {
        nombre: "Brayan",
        apellido: "Fajardo",
        edad: 21,
        id: 3

    },
    {
        nombre: "Nelson",
        apellido: "Cardenas",
        edad: 56,
        id: 4
    }
]
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/api/users', (req, res) => {
    res.json(lista)
})
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = lista.find(user => user.id === id);
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        res.send('No encontrado.')
    }
})
app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = lista[id];
    lista = lista.filter(user => user.id !== id);
    res.status(204);
    res.json(user)
})
app.post('/api/users', (req, res) => {
    const note = req.body
    res.json(note)
})
const PORT = 3001;
app.listen(PORT)
console.log('Servidor iniciado.')