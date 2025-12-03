import { Router } from "express"
import * as userService from "./user.service.js"

const router = Router()

router.get("/getUserByI", userService.getUserById)


export default router