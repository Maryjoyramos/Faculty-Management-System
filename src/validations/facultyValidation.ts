import Joi from "joi"; // Import Joi validation library

// Define a validation schema for faculty data
const facultyValidationSchema = Joi.object({
  // Faculty_ID validation
  // - Required field
  // - Must be a unique string identifier (e.g., Faculty ID)
  Faculty_ID: Joi.number().required().messages({
    "any.required": "Faculty ID is required",
  }),

  // First name validation
  // - Maximum 50 characters
  // - Required field
  First_Name: Joi.string().max(50).required().messages({
    "string.max": "First name cannot exceed 50 characters",
    "any.required": "First name is required",
  }),

  // Last name validation
  // - Maximum 50 characters
  // - Required field
  Last_Name: Joi.string().max(50).required().messages({
    "string.max": "Last name cannot exceed 50 characters",
    "any.required": "Last name is required",
  }),

  // Gender validation
  // - Must be "Male", "Female", or "Other"
  // - Required field
  Gender: Joi.string().valid("Male", "Female", "Other").required().messages({
    "any.only": "Gender must be Male, Female, or Other",
    "any.required": "Gender is required",
  }),

  // Age validation
  // - Must be a positive integer
  // - Required field
  Age: Joi.number().integer().positive().required().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.positive": "Age must be a positive number",
    "any.required": "Age is required",
  }),

  // Email validation
  // - Must be a valid email format
  // - Required field
  Email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  // Contact validation
  // - Must be a string
  // - Required field
  Contact: Joi.string().required().messages({
    "any.required": "Contact is required",
  }),

  // Faculty role validation
  // - Required field
  Faculty_Role: Joi.string().required().messages({
    "any.required": "Faculty role is required",
  }),

  // Department ID validation
  // - Required field
  Department_ID: Joi.number().required().messages({
    "any.required": "Department ID is required",
  }),

  // Leave ID validation
  // - Required field
  Leave_ID: Joi.number().required().messages({
    "any.required": "Leave ID is required",
  }),

  // Attendance ID validation
  // - Required field
  Attendance_ID: Joi.number().required().messages({
    "any.required": "Attendance ID is required",
  }),

  // Student Grade validation
  // - Required field
  Student_Grade: Joi.string().required().messages({
    "any.required": "Student Grade is required",
  }),
});

// Helper function to validate faculty data
// - Takes faculty data as input
// - Returns validation result with all errors (abortEarly: false)
export const validateFaculty = (facultyData: any) => {
  return facultyValidationSchema.validate(facultyData, { abortEarly: false });
};
