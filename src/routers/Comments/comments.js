import express from 'express'
import  {commentsControllers}  from '../../Controllers/CommentsControllers/commentsControllers.js'
import {auth}  from '../../middleware/auth/Auth.js'

const commentsRouters =   express.Router()

let RouterComments = (app)=>{
    commentsRouters.get('/comments/:id/posts',commentsControllers.commentsGet)
    commentsRouters.post('/comments/post/:id',auth.isAuth,commentsControllers.commentCreate)
    commentsRouters.put('/comments/post/:id',auth.isAuth,commentsControllers.commentsUpdate)
    commentsRouters.delete('/comments/post/:id/user/:userid',auth.isAuth,commentsControllers.commentsDelete)
    app.use(commentsRouters)
}

export default RouterComments