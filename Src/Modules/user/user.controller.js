import { Router } from "express"
import * as userService from "./user.service.js"
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js"
import { validation } from "../../Middelwares/validation.middelwares.js"
import { meetingValidation, tasksValidation } from "./user.validation.js"
import { fileUplaod } from "../../Utlis/multer.utlis.js"


const router = Router()

router.get("/getProfile", authentication, authorization({ role: ["Admin"] }), userService.getProfile)

router.get("/getAllUsers", authentication, authorization({ role: ["Admin"] }), userService.getAllUsers)

router.patch("/updateUser/:id", authentication, authorization({ role: ["Admin"] }), userService.updateUser)

router.delete("/deleteUser/:id", authentication, authorization({ role: ["Admin"] }), userService.deleteUser)

router.post("/createUser", authentication, authorization({ role: ["Admin"] }), userService.createUser)

router.post("/createTasks", validation(tasksValidation), authentication, fileUplaod().single("files"), authorization({ role: ["Admin"] }), userService.createTasks)

router.patch("/updateTasksByAdmin/:id", authentication, authorization({ role: ["Admin"] }), userService.updateTasksByAdmin)

router.delete("/deleteTasks/:id", authentication, authorization({ role: ["Admin"] }), userService.deleteTasks)

router.get("/getTasks/:id", authentication, authorization({ role: ["Employee"] }), userService.getTasks)

router.patch("/updateTasksByEmp/:id", authentication, authorization({ role: ["Employee"] }), userService.updateTasksByEmp)


router.post("/creatMeeting", validation(meetingValidation), authentication, fileUplaod().single("files"), authorization({ role: ["Employee", "HR", "Admin"] }), userService.creatMeeting)

router.get("/getAllMeeting", authentication, authorization({ role: ["Admin"] }), userService.getAllMeeting)

router.get("/getAllMeetings/:id", authentication, authorization({ role: ["Employee", "HR", "Admin"] }), userService.getAllMeetings)

router.patch("/updateMeeting/:id", authentication, authorization({ role: ["Employee", "HR", "Admin"] }), userService.updateMeeting)

router.delete("/deleteMeeting/:id", authentication, authorization({ role: ["Employee", "HR", "Admin"] }), userService.deleteMeeting)

router.get("/getMeetingIn/:id", authentication, authorization({ role: ["Employee", "HR", "Admin"] }), userService.getMeetingIn)

export default router
