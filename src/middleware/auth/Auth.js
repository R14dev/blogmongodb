import jsonwebtoken from "jsonwebtoken";
import token from "../../models/token/token.js";
import { help } from "../../util/help/help.js";


export class auth{
    static async createToken(UserId,expiredIn){
        return await jsonwebtoken.sign({},process.env.SECRETE_KEY,{
            subject:`${UserId}`,
            expireIn:`${expiredIn}`
        })
    }

    static async isAuth(request, response,next){
        try {
            const TokenBerarer = request.headers.authorization
            if(!TokenBerarer){
                response.status(400)
                throw new Error('invalid token')
            }

            if(!TokenBerarer.startsWith('Bearer')){
                response.status(400)
                throw new Error('invalid token')
            }
           const [,token] = TokenBerarer.split(' ')
           const verified = await jsonwebtoken.verify(token,process.env.SECRETE_KEY)
            if(verified){
                next()
               
            }
            response.status(400)
            throw new Error('invalid token')
        } catch (error) {
            response.status(400)
            throw error
        }
    }
    static async refreshTokenCreateUser(request, response){
        try {
            // token get by params , post,or headers
            const tokenBearer = request.body.token || request.headers.authorization
            // check token user params
            if(!tokenBearer){
                response.status(400)
                throw new Error('invalid token !!')
            }
            if(!tokenBearer.startsWith('Bearer')){
                response.status(400)
                throw new Error('invalid token access !')
            }
            // get token positions
            const [,tokenAccess] = tokenBearer.split(' ')
            
            if( ! await jsonwebtoken.verify(tokenAccess,process.env.SECRETE_KEY)){
                response.status(400)
                throw new Error('invalid expired token !!!')
            }
            // find token access user
            const findTokenAccess = await token.findOne({token:tokenAccess})

            // check user  token access
            if(!findTokenAccess){
                response.status(400)
                throw new Error('invalid token invalid ')
            }

            // date expire user token
            const dateExpire = new Date(findTokenAccess.expireDate)
            /// transform Date In Number
            const TransformDateInNumber = new String(dateExpire).slice(0,10).match(/\d/g).join('');
            
            // verified date user
            if(parseInt(TransformDateInNumber) < parseInt(help.expireDate())){
                await token.deleteOne({token})
                response.status(400)
                throw new Error('invalid expired')
            }

            // delete token user
            await token.deleteOne({token})
            const refreshTokenAccess = await this.createToken(findTokenAccess.userId)

            // get date today user
            const today = new Date()
            //createdAt user
            const CreatedAt = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
           
            // save token user 
            await token.create({
                token:refreshTokenAccess,
                userId:token.userId,
                expireDate:help.expireDate(7),
                createdAt:CreatedAt
            })

            // return user token refresh
            return response.status(200).send(refreshTokenAccess)

        } catch (error) {
            throw error
        }
    }
    
}