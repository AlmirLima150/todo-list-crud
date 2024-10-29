import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.listen(3000)

//CREATE 
app.post('/tasks', async (req, res) => {
    await prisma.task.create({
        data: {
            content: req.body.content
        }
    })
    res.status(201).json(req.body)
})
//READ 
app.get('/tasks', async (req, res) => {
    const tasks = await prisma.task.findMany()
    res.status(200).json(tasks)
})
//UPDATE 
app.put('/tasks/:id', async (req, res) => {
    await prisma.task.update({
        where: {
            id: req.params.id
        },
        data: {
            content: req.body.content,
            status: req.body.status
        }
    })
})
//DELETE 
app.delete('/tasks/:id', async (req, res) => {
    await prisma.task.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: 'Usuário deletado com sucesso!'})
})