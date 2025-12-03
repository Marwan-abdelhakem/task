import { Router } from "express"
import * as userService from "./user.service.js"
import { authentication } from "../../Middelwares/auth.middlewares.js"
const router = Router()

router.get("/getProfile", authentication, userService.getProfile)


export default router