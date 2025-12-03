import connectDb from "./DB/connectDB.js"
import globalErrorHandler from "./Utlis/errorHandler.utlis.js"
import authRouter from "./Modules/auth/auth.controller.js"
import userRouter from "./Modules/user/user.controller.js"
import cookieParser from "cookie-parser";

const bootStrap = async (app, express) => {
    app.use(express.json())
    await connectDb()

    app.use("/api/auth", authRouter)
    app.use("/api/users", userRouter)

    app.use(cookieParser());


    app.all("/*dummy", (req, res, next) => {
        return next(new Error("Not found Handler !!!!", { cause: 409 }))
    })

    app.use(globalErrorHandler)
}

export default bootStrap