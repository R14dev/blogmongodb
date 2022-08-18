import express from 'express'
import {userscontrollers} from '../../Controllers/UsersControllers/usersControllers.js'

const userRouters = express.Router()

let routesUser = (app)=>{
    userRouters.post('/user/login/', userscontrollers.loginUser)
    userRouters.post('/users/register/', userscontrollers.createUser)
    userRouters.get('/users/:userid/posts/', userscontrollers.getUserPost)
    userRouters.delete('/users/:userid/post/:id',userscontrollers.delete)
    userRouters.post('/users/:userid/avatar/', userscontrollers.avatar)
    userRouters.get('/users/:userid/posts/:page',userscontrollers.paginationPostUser)
    app.use(userRouters)
}


export default routesUser