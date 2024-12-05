import Joi from "joi"; // Import Joi validation library

// Define a validation schema for attendance data
const attendanceValidationSchema = Joi.object({
  // Attendance ID validation
  // - Required field
  Attendance_ID: Joi.number().required().messages({
    "any.required": "Attendance ID is required",
  }),

  // Date validation
  // - Must be a valid date
  // - Required field
  Date: Joi.date().required().messages({
    "date.base": "Please provide a valid date",
    "any.required": "Date is required",
  }),

  // Status validation
  // - Must be "Present" or "Absent"
  // - Required field
  Status: Joi.string().valid("Present", "Absent","Late","Excused").required().messages({
    "any.only": "Status must be either Present, Absent, Late or Excused",
    "any.required": "Status is required",
  }),
});

// Helper function to validate attendance data
// - Takes attendance data as input
// - Returns validation result with all errors (abortEarly: false)
export const validateAttendance = (attendanceData: any) => {
  return attendanceValidationSchema.validate(attendanceData, { abortEarly: false });
};
