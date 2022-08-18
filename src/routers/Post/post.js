import express from 'express'
import { postscontrollers } from '../../Controllers/PostsControllers/postsControllers.js'
import { auth } from '../../middleware/auth/Auth.js'
const postRouters = express.Router()

let RouterPost = (app)=>{
    postRouters.get('/posts/',postscontrollers.getAllPost)
    postRouters.get('/posts/:id/',postscontrollers.getPost)
    postRouters.get('/posts/:page',postscontrollers.paginationPost)
    postRouters.post('/posts/user/:userid/',auth.isAuth,postscontrollers.PostCreate)
    postRouters.put('/posts/:id/user/:userid/',auth.isAuth,postscontrollers.Update)
    app.use(postRouters)
}

export default RouterPost;
