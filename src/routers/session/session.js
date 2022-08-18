import express from 'express'
import { auth } from '../../middleware/auth/Auth'
const refreshtokenRouter = express.Router()

let RouterRefreshToken = (app)=>{
    refreshtokenRouter.post('/session/',auth.refreshTokenCreateUser)
    app.use(refreshtokenRouter)
}
export default RouterRefreshToken