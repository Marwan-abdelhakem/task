import multer from "multer";

// export const fileValidation = {
//     documents: [
//         "application/pdf"
//     ]
// }


// export const fileUplaod = ({ customPath = "general" } = {}) => {

//     let basePath = `uploads/${customPath}`
//     const fullPath = path.resolve(`/tmp/${basePath}`)
//     if (!fs.existsSync(fullPath)) {
//         fs.mkdirSync(fullPath, { recursive: true })
//     }
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, fullPath)
//         },
//         filename: (req, file, cb) => {
//             cb(null, file.originalname)
//         }
//     })

//     // const fileFilter = (req, file, cb) => {
//     //     if (validation.includes(file.mimetype)) {
//     //         cb(null, true)
//     //     } else {
//     //         return cb(new Error("Invalid File Type"), false)
//     //     }
//     // }
//     return multer({
//         // fileFilter,
//         storage
//     })
// }
export const fileUpload = () => {
    const storage = multer.memoryStorage(); // تخزين مؤقت في الذاكرة
    return multer({ storage });
};