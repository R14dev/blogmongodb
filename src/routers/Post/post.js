import express from 'express'
import { postscontrollers } from '../../Controllers/PostsControllers/postsControllers'
import { auth } from '../../middleware/auth/Auth'
const postRouters = express.Router()

let RouterPost = (app)=>{
    postRouters.get('/posts/',postscontrollers.getAllPost)
    postRouters.get('/posts/:id/',postscontrollers.getPost)
    postRouters.get('/posts/:page',postscontrollers.paginationPost)
    postRouters.post('/posts/user/:userid/',auth.isAuth,postscontrollers.PostCreate)
}

export default RouterPost;
