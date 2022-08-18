import Queue from 'bull'
import * as TaksMailer from './task/index.js'
import redisConfig from '../redisconfiguration/redis.config.js'


const Queues = Object.values(TaksMailer).map(Task=> ({
    bull: new Queue(Task.key,redisConfig),
    name: Task.key,
    handler: Task.handler
}))

export default {
    Queues,
    add(name,data){
        const QueusFind = Queues.find(Task=> Task.name == name)
        return QueusFind.bull.add(data)
    },
    process(){
        return Queues.forEach(TaskQueus=>{
            TaskQueus.bull.process(TaskQueus.handler)
            TaskQueus.bull.on('failed',(task,error)=>{
                console.log("Job failed ",job.name,job.data)
                console.log(error)
            })
        })
    }
}