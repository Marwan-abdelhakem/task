import successResponse from "../../Utlis/successRespone.utlis.js"
import UserModel from "../../DB/model/user.model.js"
import { comparePassowrd, hashPassword } from "../../Utlis/hash.utlis.js"
import { signToken } from "../../Utlis/token.utlis.js"
import * as dbService from "../../DB/dbService.js"


export const signUP = async (req, res, next) => {
    const { role, user_name, email, password, phone, salary } = req.body
    const user = await dbService.findOne({ model: UserModel, filter: { email } })
    if (user) {
        return next(new Error("Email already exists", { cause: 409 }))
    }
    const hasshPassword = await hashPassword({ plainText: password })
    const createUser = await dbService.create({ model: UserModel, data: [{ role, user_name, email, password: hasshPassword, phone, salary }] })
    return successResponse({ res, statusCode: 201, message: "User Create Successfully", data: createUser })
}

export const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await dbService.findOne({ model: UserModel, filter: { email } })
    if (!user) {
        return next(new Error("user not Founded", { cause: 404 }))
    }
    const isMatch = await comparePassowrd({ plainText: password, hashPassword: user.password })
    if (!isMatch) {
        return next(new Error("Invalid password", { cause: 400 }))
    }

    const accessToken = signToken({
        payload: { _id: user._id }, options: {
            expiresIn: "1d",
            issuer: "Sakanly",
            subject: "Authentication",
        }
    })

    const refreshToken = signToken({
        payload: { _id: user._id }, options: {
            expiresIn: "7d",
            issuer: "Sakanly",
            subject: "Authentication",
        }
    })

    return successResponse({ res, statusCode: 200, message: "Login Successfully", data: { accessToken, refreshToken } })
}




