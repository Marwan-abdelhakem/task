import joi from "joi"
//title   description    assignBy   assignTo    startDate  endDate  files status
export const tasksValidation = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    assignBy: joi.string().required(),
    assignTo: joi.string().required(),
    startDate: joi.date().required(),
    endDate: joi.date()
        .greater(joi.ref("startDate"))
        .required()
        .messages({
            "date.greater": "End date must be after the start date",
        }),
    files: joi.any().optional(),
    status: joi.string().valid("available", "unavailable").required(),
    notes: joi.string().optional(),
})
//role title subTitle describtion day startTime endTime typeOfMeeting zoomLink addUsers  files 
export const meetingValidation = joi.object({
    role: joi.string().valid("User", "Admin", "Employee"),
    title: joi.string().required().messages({
        "any.required": "Title is required"
    }),
    subTitle: joi.string().required(),
    describtion: joi.string().required(),
    day: joi.date().required(),
    startTime: joi.date().required(),
    endTime: joi.date().required(),
    typeOfMeeting: joi.string().valid("online", "offline"),
    zoomLink: joi.string().uri()
        .when("typeOfMeeting", {
            is: "online",
            then: joi.required(),
            otherwise: joi.forbidden()
        }),
    creatorId: joi.string().required(),
    addUsers: joi.array().items(joi.string()),
    files: joi.any().optional()
})
//role creatorId  name title email phone age gender qualification skills range_salary experince cv
export const jobValidation = joi.object({
    role: joi.string().valid("HR", "Admin").required(),
    creatorId: joi.string().required(),
    name: joi.string().required(),
    title: joi.string().required(),
})

export const newEmployeeValidation = joi.object({
    name: joi.string().required(),
    title: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    age: joi.string().required(),
    gender: joi.string().valid("male", "female"),
    qualification: joi.string().required(),
    skills: joi.string(),
    range_salary: joi.number().required(),
    experince: joi.string().required(),
    cv: joi.any().required(),
    job_id: joi.string().required()
})