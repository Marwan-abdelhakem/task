import successResponse from "../../Utlis/successRespone.utlis.js"
import UserModel from "../../DB/model/user.model.js"
import * as dbService from "../../DB/dbService.js"
import { comparePassowrd, hashPassword } from "../../Utlis/hash.utlis.js"

export const getProfile = async (req, res, next) => {
    return successResponse({ res, statusCode: 200, message: "successfully", data: { user: req.user } })
}

export const getAllUsers = async (req, res, next) => {
    const users = await UserModel.find()
    if (users.length === 0) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "successfully", data: { user: users } })
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params
    const user = await UserModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } }, { new: true })
    if (!user) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "User Update successffully", data: user })
}

export const deleteUser = async (req, res, next) => {
    const { id } = req.params
    const user = await UserModel.findOneAndDelete({ _id: id })
    if (!user) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "User Deleted Successfully" })
}

export const createUser = async (req, res, next) => {
    const { role, user_name, email, password, phone, salary } = req.body
    const user = await dbService.findOne({ model: UserModel, filter: { email } })
    if (user) {
        return next(new Error("Email already exists", { cause: 409 }))
    }
    const hasshPassword = await hashPassword({ plainText: password })
    const createUser = await dbService.create({ model: UserModel, data: [{ role, user_name, email, password: hasshPassword, phone, salary }] })
    return successResponse({ res, statusCode: 201, message: "User Create Successfully", data: createUser })
}