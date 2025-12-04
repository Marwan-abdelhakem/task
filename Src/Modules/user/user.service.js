import successResponse from "../../Utlis/successRespone.utlis.js"
import UserModel from "../../DB/model/user.model.js"
import * as dbService from "../../DB/dbService.js"
import { comparePassowrd, hashPassword } from "../../Utlis/hash.utlis.js"
import TaskModel from "../../DB/model/tasks.model.js"

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

//admin

export const createTasks = async (req, res, next) => {
    const { title, description, assignBy, assignTo, startDate, endDate, status, notes } = req.body
    //filesss
    const createTask = await dbService.create({ model: TaskModel, data: [{ title, description, assignBy, assignTo, startDate, endDate, status, notes/*filless*/ }] })
    return successResponse({ res, statusCode: 201, message: "Tasks Create Successfully", data: createUser })
}

export const updateTasksByAdmin = async (req, res, next) => {
    const { id } = req.params
    const task = await TaskModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } }, { new: true })
    if (!task) {
        return next(new Error("task Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "User Update successffully", data: task })
}

export const deleteTasks = async (req, res, next) => {
    const { id } = req.params
    const task = await TaskModel.findOneAndDelete({ _id: id })
    if (!task) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "task Deleted Successfully" })
}

//employee

export const getTasks = async (req, res, next) => {
    const { id } = req.params
    const tasks = await TaskModel.find({ assignTo: id })
    if (tasks.length === 0) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "task Deleted Successfully", data: tasks })
}

export const updateTasksByEmp = async (req, res, next) => {
    const { id } = req.params
    const { status, notes } = req.body
    const task = await TaskModel.findOneAndUpdate({ _id: id }, { $set: { status, notes } }, { new: true })
    if (!task) {
        return next(new Error("task Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "User Update successffully", data: task })
}