import successResponse from "../../Utlis/successRespone.utlis.js"
import UserModel from "../../DB/model/user.model.js"
import EmployeeModel from "../../DB/model/employee.model.js"
import AdminModel from "../../DB/model/admin.model.js"
import { comparePassowrd, hashPassword } from "../../Utlis/hash.utlis.js"
import * as dbService from "../../DB/dbService.js"


export const signUp = async (req, res, next) => {
    const { role, user_name, email, password, phone, salary } = req.body
    const user = await dbService.findOne({ model: UserModel, filter: { email } })
    const admin = await dbService.findOne({ model: AdminModel, filter: { email } })
    const employee = await dbService.findOne({ model: EmployeeModel, filter: { email } })
    if (user || admin || employee) {
        return next(new Error("Email already exists", { cause: 409 }))
    }
    if (role == "User") {
        const hasshPassword = await hashPassword({ plainText: password })
        const createUser = await dbService.create({ model: UserModel, data: [{ role, user_name, email, password: hasshPassword, phone, salary }] })
        return successResponse({ res, statusCode: 201, message: "User Create Successfully", data: createUser })
    }
    else if (role == "Admin") {
        const hasshPassword = await hashPassword({ plainText: password })
        const createAdmin = await dbService.create({ model: AdminModel, data: [{ role, user_name, email, password: hasshPassword, phone, salary }] })
        return successResponse({ res, statusCode: 201, message: "Admin Create Successfully", data: createAdmin })
    }
    else if (role == "Employee") {
        const hasshPassword = await hashPassword({ plainText: password })
        const createEmployee = await dbService.create({ model: EmployeeModel, data: [{ role, user_name, email, password: hasshPassword, phone, salary }] })
        return successResponse({ res, statusCode: 201, message: "Admin Create Successfully", data: createEmployee })
    }
}

export const login = async (req, res, next) => {
    const { role, email, password } = req.body
    if (role == "User") {
        const user = await dbService.findOne({ model: UserModel, filter: { email } })
        if (!user) {
            return next(new Error("user not Founded", { cause: 404 }))
        }
        const isMatch = await comparePassowrd({ plainText: password, hashPassword: user.password })
        if (!isMatch) {
            return next(new Error("Invalid password", { cause: 400 }))
        }
        return successResponse({ res, statusCode: 200, message: "Login Successfully", data: user })
    }
    if (role == "Employee") {
        const employee = await dbService.findOne({ model: EmployeeModel, filter: { email } })
        if (!employee) {
            return next(new Error("Employee not Founded", { cause: 404 }))
        }
        const isMatch = await comparePassowrd({ plainText: password, hashPassword: employee.password })
        if (!isMatch) {
            return next(new Error("Invalid password", { cause: 400 }))
        }
        return successResponse({ res, statusCode: 200, message: "Login Successfully", data: employee })
    }
    if (role == "employee") {
        const admin = await dbService.findOne({ model: AdminModel, filter: { email } })
        if (!admin) {
            return next(new Error("admin not Founded", { cause: 404 }))
        }
        const isMatch = await comparePassowrd({ plainText: password, hashPassword: admin.password })
        if (!isMatch) {
            return next(new Error("Invalid password", { cause: 400 }))
        }
        return successResponse({ res, statusCode: 200, message: "Login Successfully", data: admin })
    }
}

/*
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
*/
