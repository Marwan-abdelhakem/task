import { Router } from "express"
import * as userService from "./user.service.js"
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js"
import { validation } from "../../Middelwares/validation.middelwares.js"
import { tasksValidation } from "./user.validation.js"

const router = Router()

router.get("/getProfile", authentication, authorization({ role: ["Admin"] }), userService.getProfile)

router.get("/getAllUsers", authentication, authorization({ role: ["Admin"] }), userService.getAllUsers)

router.patch("/updateUser/:id", authentication, authorization({ role: ["Admin"] }), userService.updateUser)

router.delete("/deleteUser/:id", authentication, authorization({ role: ["Admin"] }), userService.deleteUser)

router.post("/createUser", authentication, authorization({ role: ["Admin"] }), userService.createUser)

router.post("/createTasks", authentication, authorization({ role: ["Admin"] }), userService.createTasks)

router.patch("/updateTasksByAdmin/:id", authentication, authorization({ role: ["Admin"] }), userService.updateTasksByAdmin)

router.delete("/deleteTasks/:id", authentication, authorization({ role: ["Admin"] }), userService.deleteTasks)

router.get("/getTasks/:id", authentication, authorization({ role: ["Employee"] }), userService.getTasks)

export default router
