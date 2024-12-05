import Joi from "joi"; // Import Joi validation library

// Define a validation schema for leave data
const leaveValidationSchema = Joi.object({
  // Leave ID validation
  // - Required field
  Leave_ID: Joi.number().required().messages({
    "any.required": "Leave ID is required",
  }),

  // Leave Type validation
  // - Must be one of "Sick", "Vacation", "Emergency", "Other"
  // - Required field
  Leave_Type: Joi.string()
    .valid("Sick", "Vacation", "Emergency", "Other")
    .required()
    .messages({
      "any.only": "Leave type must be Sick, Vacation, Emergency, or Other",
      "any.required": "Leave type is required",
    }),

  // Faculty ID validation
  // - Required field
  Faculty_ID: Joi.number().required().messages({
    "any.required": "Faculty ID is required",
  }),

  // Date validation
  // - Must be a valid date
  // - Required field
  Date: Joi.date().iso().required().messages({
    "date.base": "Date must be a valid ISO date",
    "any.required": "Date is required",
  }),

  // Status validation
  // - Must be one of "Approved", "Pending", "Rejected"
  // - Required field
  Status: Joi.string()
    .valid("Approved", "Pending", "Rejected")
    .required()
    .messages({
      "any.only": "Status must be Approved, Pending, or Rejected",
      "any.required": "Status is required",
    }),
});

// Helper function to validate leave data
// - Takes leave data as input
// - Returns validation result with all errors (abortEarly: false)
export const validateLeave = (leaveData: any) => {
  return leaveValidationSchema.validate(leaveData, { abortEarly: false });
};
