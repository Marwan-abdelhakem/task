import successResponse from "../../Utlis/successRespone.utlis.js"
import UserModel from "../../DB/model/user.model.js"
import * as dbService from "../../DB/dbService.js"


export const getProfile = async (req, res, next) => {
    return successResponse({ res, statusCode: 200, message: "successfully", data: { user: req.user } })
}