import Joi from "joi"; // Import Joi validation library

// Define a validation schema for department data
const departmentValidationSchema = Joi.object({

 // Department ID validation
  // - Required field
  Department_ID: Joi.number().required().messages({
    "any.required": "Department ID is required",
  }),
  // Department Name validation
  // - Maximum 100 characters
  // - Required field
  Department_Name: Joi.string().max(100).required().messages({
    "string.max": "Department name cannot exceed 100 characters",
    "any.required": "Department name is required",
  }),

  // Department Head validation
  // - Maximum 50 characters
  // - Required field
  Department_Head: Joi.string().max(50).required().messages({
    "string.max": "Department head name cannot exceed 50 characters",
    "any.required": "Department head is required",
  }),

 
  
});

// Helper function to validate department data
// - Takes department data as input
// - Returns validation result with all errors (abortEarly: false)
export const validateDepartment = (departmentData: any) => {
  return departmentValidationSchema.validate(departmentData, { abortEarly: false });
};
