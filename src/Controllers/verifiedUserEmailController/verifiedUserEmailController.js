import { auth } from "../../middleware/auth/Auth.js"
import users from "../../models/users/users.js"
import verifiedTokenUser from "../../models/verifiedTokenUser/verifiedTokenUser"
import Queue from "../../service/jobs/Queue.js"
import tokenModel from "../../models/token/token.js"
import { help } from "../../util/help/help.js"


export class verifiedUserEmailController{
    static async verifiedUserMail (request,response){
        try {
            // destruct params
            const {token} = request.params
           
            // check params
            if(!token){
                response.status(400)
                throw new Error('invalid params')
            }

            // find token
           const userTokenFind = await verifiedTokenUser.findOne({token})
            
           // get users detalhes 
           const getUserDetalhes = await users.findOne({_id:userTokenFind.userId})

           // check if token existis
           if(!userTokenFind){
               response.status(400)
               throw new Error(`error token not found !!!`)
           }
           // get date expired token
           const dateExpire = new Date(userTokenFind.expireDate)
           /// transform Date In Number
           const TransformDateInNumber = new String(dateExpire).slice(0,10).match(/\d/g).join('');

           // compare date interval
           if(parseInt(TransformDateInNumber) < parseInt(help.expireDate())){
               // delete token expired
               await verifiedTokenUser.deleteOne({token})
               // status code return
               response.status(400)
               // error send 
               throw new Error(`token expired !! sorry`)
           }

           const date = {name:getUserDetalhes.name,email:getUserDetalhes.email}

            // add queue taks
           await Queue.add('emailVerified',date)

           await verifiedTokenUser.deleteOne({token})

           await users.updateOne({_id:getUserDetalhes._id},{verifiedUserEmail:true})
          
           // token access user
            const tokenAccessUser = await auth.createToken(getUserDetalhes._id,'1d')
            // refresh Token Create
            const refreshTokenCreate = await auth.createToken(getUserDetalhes._id,'7d')

           // craeted at token date
            const today = new Date()
            const CreatedAt = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

            // save token user refresh 
            await tokenModel.create({
                token:refreshTokenCreate,
                userId:getUserDetalhes._id,
                expireDate:help.expireDate(7),
                createdAt:CreatedAt
            })

            // return user authenticated
           return response.status(200).send({
               name:getUserDetalhes.name,
               email:getUserDetalhes.email,
               token:tokenAccessUser,
               refreshToken:refreshTokenCreate
           })

        } catch (error) {
            throw error
        }
    }
}