
import article from "../../models/article/article.js";

export class postscontrollers {
    static async getAllPost(request,response){
        try {
            const getAllPost = await article.find()
            .populate('users')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .limit(10)

            return response.status(200).send(getAllPost)
        } catch (error) {
            throw error
        }
    }

   static async paginationPost(request,response){
       try {
           const {page} = request.params
           const perPage = 10
           if(!page){
            response.status(400)
            throw new Error('error invalid params !')
           }
           const getAllPostWithPagination = await article.find()
            .populate('users').skip(perPage * page)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .limit(10)
        return response.status(200).send(getAllPostWithPagination)
       } catch (error) {
           throw error
       }
   }
    static async getPost(request,response){
        try {
            const {id} = request.params
            const Artile = await article.findById(id).populate('users')
            return response.status(200).send(Artile)
        } catch (error) {
            throw error
        }
    }
    static async Update(request,response){
        try {
            const {description,title} = request.body
            const {userid,id} = request.params

            if(!userid || !description || !title || !id){
                response.status(400)
                throw new Error('error invalid params !')
            }
            await article.updateOne({_id:id,userId:userid},{description,title})
            return response.status(200).send()
        } catch (error) {
            throw error
        }
    }
    static async PostCreate(request,response){
        try {
            // destruct params
            const {description,title} = request.body
            const {userid} = request.params
            // check params valid 
            if(!userid || !description || !title){
                response.status(400)
                throw new Error('error invalid params !')
            }

            const checkpostDuplicatedTitle = await article.findOne({title})
            const checkpostDuplicatedDescription = await article.findOne({description})
            if(!checkpostDuplicatedTitle || !checkpostDuplicatedDescription){
                response.status(400)
                throw new Error('error invalid params !')
            }
            const today = new Date()
            const CreatedAt = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

            await article.create({
                title,
                description,
                userId:userid,
                views:0,
                createdAt:CreatedAt
            })

            response.status(200).send()
        } catch (error) {
            throw error
        }
    }
}
