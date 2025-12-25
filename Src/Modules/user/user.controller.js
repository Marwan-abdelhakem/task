import { Router } from "express"
import * as userService from "./user.service.js"
import { authentication, authorization } from "../../Middelwares/auth.middlewares.js"
import { validation } from "../../Middelwares/validation.middelwares.js"
import { jobValidation, meetingValidation, newEmployeeValidation, tasksValidation } from "./user.validation.js"
import { fileUpload } from "../../Utlis/multer.utlis.js"


const router = Router()

router.get("/getProfile", authentication, authorization({ role: ["Admin"] }), userService.getProfile)

router.get("/getAllUsers", userService.getAllUsers)

router.patch("/updateUser/:id", authentication, authorization({ role: ["Admin"] }), userService.updateUser)

router.delete("/deleteUser/:id", authentication, authorization({ role: ["Admin"] }), userService.deleteUser)

router.post("/createUser", authentication, authorization({ role: ["Admin"] }), userService.createUser)

router.post("/createTasks", validation(tasksValidation), authentication, fileUpload().single("files"), authorization({ role: ["Admin"] }), userService.createTasks)

router.patch("/updateTasksByAdmin/:id", authentication, authorization({ role: ["Admin"] }), userService.updateTasksByAdmin)

router.delete("/deleteTasks/:id", authentication, authorization({ role: ["Admin"] }), userService.deleteTasks)

router.get("/getTasks/:id", authentication, authorization({ role: ["Employee"] }), userService.getTasks)

router.patch("/updateTasksByEmp/:id", authentication, authorization({ role: ["Employee"] }), userService.updateTasksByEmp)

router.post("/LeaveRequest", authentication, authorization({ role: ["Employee"] }), userService.LeaveRequest)

router.get("/getAllRequest", authentication, authorization({ role: ["HR"] }), userService.getAllRequest)

router.get("/getRequestById/:id", authentication, authorization({ role: ["HR"] }), userService.getRequestById)

router.patch("/updateRequest/:id", authentication, authorization({ role: ["HR"] }), userService.updateRequest)

router.post("/creatMeeting", validation(meetingValidation), authentication, fileUpload().single("files"), authorization({ role: ["Employee", "HR", "Admin"] }), userService.creatMeeting)

router.get("/getAllMeeting", authentication, authorization({ role: ["Admin"] }), userService.getAllMeeting)

router.get("/getAllMeetings/:id", authentication, authorization({ role: ["Employee", "HR", "Admin"] }), userService.getAllMeetings)

router.patch("/updateMeeting/:id", authentication, authorization({ role: ["Employee", "HR", "Admin"] }), userService.updateMeeting)

router.delete("/deleteMeeting/:id", authentication, authorization({ role: ["Employee", "HR", "Admin"] }), userService.deleteMeeting)

router.get("/getMeetingIn/:id", authentication, authorization({ role: ["Employee", "HR", "Admin"] }), userService.getMeetingIn)

router.post("/createJob", validation(jobValidation), authentication, authorization({ role: ["Admin", "HR"] }), userService.createJob)

router.post("/applayForJob", validation(newEmployeeValidation), fileUpload().single("cv"), userService.applayForJob)

router.get("/getAlljobs", userService.getAlljobs)

router.get("/getJobById/:id", userService.getJobById)

router.delete("/deleteJobs/:id", authentication, authorization({ role: ["Admin", "HR"] }), userService.deleteJobs)

router.patch("/updateJob/:id", authentication, authorization({ role: ["Admin", "HR"] }), userService.updateJobs)

export default router
