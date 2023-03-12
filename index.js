import express from 'express'
import {v4} from 'uuid';

const app = express()
const port = 3000
app.use(express.json())

const users = []

app.get("/users", (request, response) => {
    return response.json(users)
})

app.post("/users", (request, response) => {
    const {name, age} = request.body
    const user = {id: v4(), name, age}
    users.push(user)
    return response.status(201).json(user)
})

app.put("/users/:id", (request, response) => {
    const {id} = request.params
    const {name, age} = request.body
    const newUser = {id: id, name, age}
    const index = users.findIndex(user => user.id === id)
    if(index < 0) {
        return response.status(404).json({message: "User not found"})
    }
    users[index] = newUser;
    return response.status(200).json(newUser)

})

app.delete("/users/:id", (request, response) => {
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)
    if(index < 0) {
        return response.status(404).json({message: "User not found"})
    }
    users.splice(index, 1)
    return response.status(204).json()
})

app.listen(port, () => {console.log(`sucessful start server in port ${port}`)})