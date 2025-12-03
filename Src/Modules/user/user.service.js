import successResponse from "../../Utlis/successRespone.utlis.js"
import UserModel from "../../DB/model/user.model.js"
import * as dbService from "../../DB/dbService.js"


export const getUserById = async (req, res, next) => {
    const { id } = req.params
    const user = await dbService.findById({ model: UserModel, id: id })
    if (!user) {
        return next(new Error("user not Founded", { cause: 404 }))
    }
    return successResponse({ res, statusCode: 200, message: "successfully", data: user })
}