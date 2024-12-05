import { Document } from "mongoose";

// Define the IAttendance interface for attendance documents in the database
export interface IAttendance extends Document {
  Attendance_ID: Number; // Primary Key for attendance record
  Date: Date; // The date of the attendance
  Status: String;
}

