import express from 'express'
import {userscontrollers} from '../../Controllers/UsersControllers/usersControllers.js'
import { auth } from '../../middleware/auth/Auth.js'
import {loginUserValidator,registerUserValidator,UservalidatorParams} from '../../middleware/validator/loginUserAndRegisterValidator.js'

const userRouters = express.Router()

let routesUser = (app)=>{
    userRouters.post('/user/login/',loginUserValidator, userscontrollers.loginUser)
    userRouters.post('/users/register/',registerUserValidator,userscontrollers.createUser)
    userRouters.get('/users/:userid/posts/',UservalidatorParams,auth.isAuth, userscontrollers.getUserPost)
    userRouters.delete('/users/:userid/post/:id', UservalidatorParams,auth.isAuth,userscontrollers.delete)
    userRouters.post('/users/:userid/avatar/',UservalidatorParams, auth.isAuth, userscontrollers.avatar)
    userRouters.get('/users/:userid/posts/:page', UservalidatorParams,auth.isAuth,userscontrollers.paginationPostUser)
    app.use(userRouters)
}


export default routesUser