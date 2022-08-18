import mongoose from "mongoose"
import { Logger } from "../util/help/help.js"

export class ConnectionDB {
    static async  Conection (){
        try {
            mongoose.connect(process.env.MONGOOSE_URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            
            Logger.info(`mongoose db connected !!`)
        } catch (error) {
            Logger.info(error.message)
            process.exit(0)
        }
    }
}