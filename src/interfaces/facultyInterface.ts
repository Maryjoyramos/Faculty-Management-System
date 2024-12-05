import { Document } from "mongoose";

// Define the IFaculty interface for faculty documents in the database
export interface IFaculty extends Document {
  Faculty_ID: Number; // Primary Key
  First_Name: String;
  Last_Name: String;
  Gender: "Male" | "Female" | "Other"; // Enum for gender
  Age: Number;
  Email: String;
  Contact: String;
  Faculty_Role: String;
  Department_ID: Number; // Foreign Key to the Department
  Leave_ID: Number; // Foreign Key to the Leave
  Attendance_ID: Number; // Foreign Key to the Attendance
  Student_Grade: String;
}