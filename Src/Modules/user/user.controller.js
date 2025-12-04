import { Router } from "express"
import * as userService from "./user.service.js"
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js"


const router = Router()

router.get("/getProfile", authentication, authorization({ role: ["Admin"] }), userService.getProfile)

router.get("/getAllUsers", authentication, authorization({ role: ["Admin"] }), userService.getAllUsers)

router.patch("/updateUser/:id", authentication, authorization({ role: ["Admin"] }), userService.updateUser)

router.delete("/deleteUser/:id", authentication, authorization({ role: ["Admin"] }), userService.deleteUser)

router.post("/createUser", authentication, authorization({ role: ["Admin"] }), userService.createUser)

export default router