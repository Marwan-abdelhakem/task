import multer from "multer"
import path from "node:path"

export const fileUplaod = () => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve("./uploads"))
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })


    return multer({
        storage
    })
}