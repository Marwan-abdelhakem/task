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