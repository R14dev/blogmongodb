import util from 'util'
import multer from 'multer'

const maxSize = 2 * 1024 * 1024
let storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'/upload/avatar')
    },
    filename:(req,file,cb)=>{
        cbn(null,file.originalname)
    }
})

let uploadFile= multer({
    storage:storage,
    limits:{fileSize:maxSize},
}).single('file')


const uploadMeddleaware = util.promisify(uploadFile)

export default uploadMeddleaware
