import express  from "express"
import  'dotenv/config'
import errorExpressCustom from "./util/apperror/Apperror.js"
import { Logger } from "./util/help/help.js";
import { ConnectionDB } from "./config/ConnectionDB.js";
import routesUser from "./routers/Users/users.js";
import RouterComments from "./routers/Comments/comments.js";
import RouterPost from "./routers/Post/post.js";
import RouterRefreshToken from "./routers/session/session.js";


const app = express()

const port = process.env.PORT || 5000 ;

app.use(errorExpressCustom)

app.use(express.json())

app.use(express.urlencoded({extended: true}))

routesUser(app)
RouterPost(app)
RouterComments(app)
RouterRefreshToken(app)

app.listen(port,()=>{
    Logger.info(`server running ... ${process.env.PORT}`)
    ConnectionDB.Conection()
})