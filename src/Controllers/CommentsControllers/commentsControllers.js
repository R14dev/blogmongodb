
import  comments  from "../../models/comments/comments.js";
import { Logger } from "../../util/help/help.js";

export class commentsControllers {
   static async commentsUpdate (request,response) {
        try {
            // destruct params
            const {userid,comment} = request.body
            const {id} = request.params
            // check params valid 
            if(!id || !userid||!comment){
                response.status(400)
                throw new Error('invalid params !!!')
            }

            const checkComment = await comments.findOne({comment})
            // check comment 
            if(checkComment){
                response.status(400)
                throw new Error('error comment duplicated !!!')
            }
            // update comment
            await comments.updateOne({_id:id,userId:userid,articleId:id},{
                comment:comment,
            })
            return response.status(200).send()

        } catch (error) {
            throw error
        }
    }
    static async commentsDelete (request,response) {
        try {
            const {id,userid} = request.params
           // check params
            if(!id || !userid){
                response.status(400)
                throw new Error('invalid params !')
            }
            // delete comment user
            await comments.deleteOne({_id:id,userId:userid})
            // return response
            return response.status(200).send()
            
        } catch (error) {
            throw error
        }
    }
    static   async commentCreate (request,response) {
        try {
            // destruct params
            const {comment,userid} = request.body
            const {id} = request.params
            // check params
            if(!comment || !userid||!id){
                response.status(400)
                throw new Error('Error invalid params !')
            }
            // comment check duplicated
            const checkComment = await comments.findOne({comment})
            // check comment 
            if(checkComment){
                response.status(400)
                throw new Error('error comment duplicated !!!')
            }
            // create date user
            const today = new Date()
            const CreatedAt = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

            // create comment 
            await comments.create({
                comment,
                userId:userid,
                articleId:id,
                createdAt:CreatedAt
            })
            // response status user 
           return response.status(200).send()
           
        } catch (error) {
            throw error
        }
    }
    static  async commentsGet  (request,response) {
        try {
            const {articleid} = request.params
            // check params
            if(!articleid){
                response.status(400)
                throw new Error('Error invalid params !')
            }
            // get all comments by post
            const getCommentsAll = await comments.find({articleId:articleid})
            // return response date
            return response.status(200).send(getCommentsAll)
        } catch (error) {
            throw error
        }
    }

}


