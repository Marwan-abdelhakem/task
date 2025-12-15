import successResponse from "../../Utlis/successRespone.utlis.js"
import UserModel from "../../DB/model/user.model.js"
import * as dbService from "../../DB/dbService.js"
import { comparePassowrd, hashPassword } from "../../Utlis/hash.utlis.js"
import TaskModel from "../../DB/model/tasks.model.js"
import MeetingModel from "../../DB/model/meeting.model.js"
import JobModel from "../../DB/model/job.model.js"
import newEmployeeModel from "../../DB/model/newEmployee.model.js"
import { emailEvent } from "../../Utlis/event.utlis.js"

export const getProfile = async (req, res, next) => {
    return successResponse({ res, statusCode: 200, message: "successfully", data: { user: req.user } })
}

export const getAllUsers = async (req, res, next) => {
    const users = await UserModel.find()
    if (users.length === 0) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "successfully", data: { user: users } })
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params
    const user = await UserModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } }, { new: true })
    if (!user) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "User Update successffully", data: user })
}

export const deleteUser = async (req, res, next) => {
    const { id } = req.params
    const user = await UserModel.findOneAndDelete({ _id: id })
    if (!user) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "User Deleted Successfully" })
}

export const createUser = async (req, res, next) => {
    const { role, user_name, email, password, phone, salary } = req.body
    const user = await dbService.findOne({ model: UserModel, filter: { email } })
    if (user) {
        return next(new Error("Email already exists", { cause: 409 }))
    }
    const hasshPassword = await hashPassword({ plainText: password })
    const createUser = await dbService.create({ model: UserModel, data: [{ role, user_name, email, password: hasshPassword, phone, salary }] })
    return successResponse({ res, statusCode: 201, message: "User Create Successfully", data: createUser })
}

//admin

export const createTasks = async (req, res, next) => {
    const { title, description, assignBy, assignTo, startDate, endDate, status, notes } = req.body
    const files = req.file.filename
    const createTask = await dbService.create({ model: TaskModel, data: [{ title, description, assignBy, assignTo, startDate, endDate, files, status, notes }] })
    return successResponse({ res, statusCode: 201, message: "Tasks Create Successfully", data: createTask })
}

export const updateTasksByAdmin = async (req, res, next) => {
    const { id } = req.params
    const task = await TaskModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } }, { new: true })
    if (!task) {
        return next(new Error("task Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "User Update successffully", data: task })
}

export const deleteTasks = async (req, res, next) => {
    const { id } = req.params
    const task = await TaskModel.findOneAndDelete({ _id: id })
    if (!task) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "task Deleted Successfully" })
}

//employee

export const getTasks = async (req, res, next) => {
    const { id } = req.params
    const tasks = await TaskModel.find({ assignTo: id })
    if (tasks.length === 0) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "task Deleted Successfully", data: tasks })
}

export const updateTasksByEmp = async (req, res, next) => {
    const { id } = req.params
    const { status, notes } = req.body
    const task = await TaskModel.findOneAndUpdate({ _id: id }, { $set: { status, notes } }, { new: true })
    if (!task) {
        return next(new Error("task Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "User Update successffully", data: task })
}

//Meeting 

//role title subTitle describtion day startTime endTime typeOfMeeting zoomLink  creatorId addUsers  files 
export const creatMeeting = async (req, res, next) => {
    const { role, title, subTitle, describtion, day, startTime, endTime, typeOfMeeting, zoomLink, creatorId, addUsers } = req.body
    const files = req.file ? req.file.filename : null
    const creator = await dbService.findById({ model: UserModel, id: creatorId })
    if (!creator) {
        return next(new Error("User Not Founded", { cause: 404 }))
    }
    const user = await dbService.findById({ model: UserModel, id: addUsers })
    if (!user) {
        return next(new Error("User Not Founded", { cause: 404 }))
    }
    if (creator.role == "Admin") {
        const createMeeting = await dbService.create({ model: MeetingModel, data: [{ role, title, subTitle, describtion, day, startTime, endTime, typeOfMeeting, zoomLink, creatorId, addUsers, files }] })
        return successResponse({ res, statusCode: 201, message: "Meeting Create Successfully", data: createMeeting })
    }

    if (creator.role !== user.role) {
        return next(new Error("Meeting not allowed.", { cause: 409 }))
    }
    const createMeeting = await dbService.create({ model: MeetingModel, data: [{ role, title, subTitle, describtion, day, startTime, endTime, typeOfMeeting, zoomLink, creatorId, addUsers, files }] })
    return successResponse({ res, statusCode: 201, message: "Meeting Create Successfully", data: createMeeting })
}

//admin

//Get All Meeting

export const getAllMeeting = async (req, res, next) => {
    const meeting = await MeetingModel.find()
    if (meeting.length === 0) {
        return next(new Error("Users Not Founded", { cause: 404 }))
    }
    return successResponse({ res, statusCode: 200, message: "Successfully", data: meeting })
}

export const getAllMeetings = async (req, res, next) => {
    const { id } = req.params
    const meeting = await MeetingModel.find({ creatorId: id })
    if (meeting.length === 0) {
        return next(new Error("Users Not Founded", { cause: 404 }))
    }
    return successResponse({ res, statusCode: 200, message: "Successfully", data: meeting })
}

export const updateMeeting = async (req, res, next) => {
    const { id } = req.params
    const { creatorId } = req.body
    const meeting = await MeetingModel.findById(id)
    if (!meeting) {
        return next(new Error("Meeting Not Founded", { cause: 409 }))
    }
    if (meeting.creatorId.toString() !== creatorId) {
        return next(new Error("You are not the owner of this meeting", { cause: 403 }));
    }
    const updateMeeting = await MeetingModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } }, { new: true })
    if (!updateMeeting) {
        return next(new Error("Meeting Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "Meeting Update successffully", data: updateMeeting })
}

export const deleteMeeting = async (req, res, next) => {
    const { id } = req.params
    const { creatorId } = req.body
    const meeting = await MeetingModel.findById(id)
    if (!meeting) {
        return next(new Error("Meeting Not Founded", { cause: 409 }))
    }
    if (meeting.creatorId.toString() !== creatorId) {
        return next(new Error("You are not the owner of this meeting", { cause: 403 }));
    }
    const deleteMeeting = await MeetingModel.findOneAndDelete({ _id: id })
    if (!deleteMeeting) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "Meeting Deleted Successfully" })
}

export const getMeetingIn = async (req, res, next) => {
    const { id } = req.params
    const meeting = await MeetingModel.find({ addUsers: id })
    if (meeting.length === 0) {
        return next(new Error("meeting Not Founded", { cause: 404 }))
    }
    return successResponse({ res, statusCode: 200, message: "Successfully", data: meeting })
}

export const createJob = async (req, res, next) => {
    const { role, creatorId, name, title } = req.body
    const creator = await dbService.findById({ model: UserModel, id: creatorId })
    if (!creator) {
        return next(new Error("User Not Founded", { cause: 404 }))
    }
    const createJob = await dbService.create({ model: JobModel, data: [{ role, creatorId, name, title }] })
    return successResponse({ res, statusCode: 201, message: "Meeting Create Successfully", data: createJob })
}

export const applayForJob = async (req, res, next) => {
    const { name, title, email, phone, age, gender, qualification, skills, range_salary, experince, job_id } = req.body
    const cv = req.file ? req.file.filename : null
    const job = await dbService.findById({ model: JobModel, id: job_id })
    if (!job) {
        return next(new Error("job Not Founded", { cause: 404 }))
    }
    emailEvent.emit("confirmEmail", { to: email })
    const applayForJob = await dbService.create({ model: newEmployeeModel, data: [{ name, title, email, phone, age, gender, qualification, skills, range_salary, experince, cv, job_id }] })
    return successResponse({ res, statusCode: 201, message: "User created successfully", data: applayForJob })
}

export const getAlljobs = async (req, res, next) => {
    const job = await JobModel.find()
    if (job.length === 0) {
        return next(new Error("Jobs Not Founded", { cause: 404 }))
    }
    return successResponse({ res, statusCode: 200, message: "Successfully", data: job })
}

export const getJobById = async (req, res, next) => {
    const { id } = req.params
    const job = await JobModel.find({ id: id })
    if (job.length === 0) {
        return next(new Error("Jobs Not Founded", { cause: 404 }))
    }
    return successResponse({ res, statusCode: 200, message: "Successfully", data: job })
}

export const deleteJobs = async (req, res, next) => {
    const { id } = req.params
    const { creatorId } = req.body
    const job = await JobModel.findById(id)
    if (!job) {
        return next(new Error("job Not Founded", { cause: 409 }))
    }
    if (job.creatorId.toString() !== creatorId) {
        return next(new Error("You are not the owner of this Job", { cause: 403 }));
    }
    const deleteJob = await JobModel.findOneAndDelete({ _id: id })
    if (!deleteJob) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "Job Deleted Successfully" })
}

export const updateJobs = async (req, res, next) => {
    const { id } = req.params
    const { creatorId } = req.body
    const job = await JobModel.findById(id)
    if (!job) {
        return next(new Error("job Not Founded", { cause: 409 }))
    }
    if (job.creatorId.toString() !== creatorId) {
        return next(new Error("You are not the owner of this Job", { cause: 403 }));
    }
    const updateJob = await JobModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } }, { new: true })
    if (!updateJob) {
        return next(new Error("Users Not Founded", { cause: 409 }))
    }
    return successResponse({ res, statusCode: 200, message: "Meeting Update successffully", data: updateJob })
}