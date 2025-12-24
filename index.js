
import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import bootStrap from "./Src/app.controller.js"



const app = express()
const port = process.env.PORT

await bootStrap(app, express)

console.log('Cloudinary Key:', process.env.CLOUDINARY_API_KEY); // دلوقتي هتظهر
app.listen(port, () => console.log(`Server app listening on port ${port}!`))

export default app;


