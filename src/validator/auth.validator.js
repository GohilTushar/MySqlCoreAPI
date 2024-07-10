import Joi from "joi";

const registrationSchema = Joi.object({
  name: Joi.string().trim().min(3).max(255).required().messages({
    "any.required": "Name is Required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 255 characters",
  }),

  email: Joi.string().trim().email().min(3).max(255).required().messages({
    "any.required": "Email is Required",
    "string.email": "Invalid Email",
    "string.min": "Email must be at least 3 characters",
    "string.max": "Email must not exceed 255 characters",
  }),

  password: Joi.string().trim().min(6).max(1024).required().messages({
    "any.required": "Password is Required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must not exceed 1024 characters",
  }),

  interest: Joi.array().items(Joi.string().trim().required()),
  image: Joi.string().trim(),
  gender: Joi.string().valid("Male", "Female").required().messages({
    "any.required": "Gender is Required",
    "any.only": "Gender must be either 'Male' or 'Female'",
  }),
});
export default registrationSchema;
