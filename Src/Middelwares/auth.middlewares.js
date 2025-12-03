import { verifyTokin } from "../Utlis/token.utlis.js"
import * as dbService from "../DB/dbService.js"
import UserModel from "../DB/model/user.model.js"

export const authentication = async (req, res, next) => {
    const { authorization } = req.headers
    const decoded = verifyTokin({ token: authorization })

    const user = await dbService.findById({ model: UserModel, id: { _id: decoded._id } })

    if (!user) {
        return next(new Error("User Not Founded", { cause: 409 }))
    }
    req.user = user
    return next()
}