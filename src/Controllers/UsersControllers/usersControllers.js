import users from '../../models/users/users.js';
import bcryptjs from 'bcryptjs'
import Queue from '../../service/jobs/Queue.js';
import crypto from 'crypto'
import verifiedTokenUser from '../../models/verifiedTokenUser/verifiedTokenUser.js';
import {help} from '../../util/help/help.js';
import token from '../../models/token/token.js';
import {auth} from '../../middleware/auth/Auth.js';
import article from '../../models/article/article.js';
import uploadMeddleaware from '../../middleware/upload/upload.js';
import imagesModel from '../../models/images/images.model.js';
import fs from 'fs';


export class userscontrollers {


    static async loginUser(request, response) {
        try { // get params user
            const {email, password} = request.body

            // check values in params
            if (!email, !password) {
                response.status(400)
                throw new Error(`Error invalid params `)
            }

            // user check
            const user = await users.findOne({email})

            if (user) {
                const passwordCompare = bcryptjs.compare(password, user.password)
                if (! passwordCompare) {
                    response.status(400)
                    throw new Error(`invalid email and password !`)
                }

                // today user
                const today = new Date()
                // create at user
                const CreatedAt = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
                // token access
                const tokenAccess = await auth.createToken(user._id, '1d')
                // refresh token
                const refreshTokenAccess = await auth.createToken(user._id, '7d')

                // createtoken user for refresh
                await token.create({token: refreshTokenAccess, userId: user._id, expireDate: help.expireDate(7), createdAt: CreatedAt})

                const data = {
                    name: user.name,
                    email: user.email
                }
                // send mail alert login user
                await Queue.add('Alert', data)

                // return response with user date
                return response.status(200).send({token: tokenAccess, refreshToken: refreshTokenAccess, name: user.name, email: user.email})
            }
        } catch (error) {
            throw error
        }
    }

    static async avatar (request, response){
        try {
            // user id get by params
            await uploadMeddleaware(request,response)
            const {userid} = request.params
            if(!userid || request.file){
                response.status(400)
                throw new Error(`Error user invalid params or file !!!`)
            }
            // user check
            const user = await users.findById(userid)
            // check user
            if(!user){
                response.status(400)
                throw new Error(`Error user invalid params !!!`)
            }
            // update avatar user 
            await users.updateOne({_id: userid},{avatar:request.file.originalname})
            // rturn response status 
            return response.status(201).send()
        } catch (error) {
            throw error
        }
    }

    static async delete(request,response){
        try {
            const {userid,id} = request.params

            // check params users
            if (!userid || !id) {
                response.status(400)
                throw new Error(`invalid params`)
            }

            const user = await users.findOne({_id: userid})
            // check user existis
            if (! user) {
                response.status(400)
                throw new Error(`error user not found!`)
            }

            const postAticle = await article.deleteOne({_id:id,userId:userid})

            if(!postAticle){
                response.status(400)
                throw new Error(`eror post not found !!`)
            }

            const images = await imagesModel.find({articleID:postAticle._id})

            if(images){
                images.forEach(Image=>{fs.unlink(Image.images)})
                await imagesModel.deleteMany({articleID:postAticle._id})
            }
            

            return response.status(200).send()

        } catch (error) {
            throw error
        }
    }
    static async getUserPost(request, response) {
        try {
            const {userid} = request.params

            // check params users
            if (!userid) {
                response.status(400)
                throw new Error(`invalid params`)
            }

            const user = await users.findOne({_id: userid})
            // check user existis
            if (! user) {
                response.status(400)
                throw new Error(`error user not found!`)
            }
            // find Article user
            const artilesUserFind = await article.find({userId: user._id}).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).limit(10)

            // return article by user
            return response.status(200).send(artilesUserFind)

        } catch (error) {
            throw error
        }
    }

    static async paginationPostUser(request,response){
        try {
            const {page,userid} = request.body
            const perPage = 10
            if(!page || !userid){
                response.status(400)
                throw new Error(`Error invalid params !`)
            }            
            // get user
            const user = await users.findById(userid)
            if(!user){
                response.status(400)
                throw new Error(`invalid request `)
            }

             // find Article user
             const artilesUserFind = await article.find({userId: user._id})
             .skip(perPage * page)
             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
             .limit(perPage)

             // return response all post
            return response.status(200).send(artilesUserFind)
        } catch (error) {
            throw error
        }
    }

    static async createUser(request, response) {
        try {

            const {name, email, password} = request.body

            if (!name || !email || !password) {
                throw new Error(`invalid params body`)
            }

            // find email user check
            const emailAlreadyExist = await users.findOne({email: email})

            if (emailAlreadyExist) {
                response.status(400)
                throw new Error(`email already existis !!`)
            }
            // salt
            const salt = 8
            // password hash
            const passwordHasn = await bcryptjs.hash(password, salt)

            const today = new Date()

            const CreatedAt = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

            const user = await users.create({name, email,verifiedUserEmail:false, password: passwordHasn, createdAt: CreatedAt})

            const token = crypto.randomUUID()

            await verifiedTokenUser.create({token, userId: user._id, expireDate: help.expireDate(7), createdAt: CreatedAt})
            const data = {
                name,
                token,
                email
            }

            await Queue.add('welcome', data)

            return response.status(201).send()

        } catch (error) {
            response.status(400)
            throw error
        }
    }


}
