import joi from "joi"



export const signUpValidation = joi.object({
    role: joi.string().valid("User", "Admin", "Employee"),
    user_name: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string()
        .min(6)
        .pattern(/[A-z]/)
        .pattern(/[!@#$%^&*(),.?":{}|<>_\-]/).
        required()
        .messages({
            "string.min": "Password must be greater 6 ",
            "string.pattern.name": "The password must contain a capital letter.",
            "string.empty": "required"
        }),
    phone: joi.string().required(),
    salary: joi.number().min(0).required()
}).required()