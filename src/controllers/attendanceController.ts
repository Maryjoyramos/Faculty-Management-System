import { Request, Response } from "express";
import { Attendance } from "../models/attendace";
import { IAttendance } from "../interfaces/attendanceInterface";
import mongoose from "mongoose";
import { validateAttendance } from "../validations/attendaceValidation";

export class AttendanceController {
  // Create a new attendance record
  // Handles POST requests to create a new attendance record in the database
  public async createAttendance(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming attendance data against schema rules
      const { error, value: payload } = validateAttendance(req.body);
      if (error) {
        // Return early if validation fails, sending back specific error messages
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare attendance data with a new MongoDB ID
      const attendanceData: IAttendance = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new attendance record to the database
      const attendance = new Attendance(attendanceData);
      const savedAttendance = await attendance.save();

      // Return the newly created attendance record with 201 Created status
      res.status(201).json(savedAttendance);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all attendance records
  // Handles GET requests to retrieve all attendance records from the database
  public async getAllAttendance(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all attendance records from database
      const attendanceList: IAttendance[] = await Attendance.find();
      res.json(attendanceList);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get attendance record by ID
  // Handles GET requests to retrieve a specific attendance record by its ID
  public async getAttendanceById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find attendance record by ID
      const attendance: IAttendance | null = await Attendance.findById(req.params.id);

      // Return 404 if attendance record doesn't exist
      if (!attendance) {
        res.status(404).json({ message: "Attendance record not found" });
        return;
      }

      // Return the found attendance record
      res.json(attendance);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update attendance record
  // Handles PUT/PATCH requests to update an existing attendance record
  public async updateAttendance(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated attendance data
      const { error, value: payload } = validateAttendance(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the attendance record and get the updated document
      const attendance: IAttendance | null = await Attendance.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if attendance record doesn't exist
      if (!attendance) {
        res.status(404).json({ message: "Attendance record not found" });
        return;
      }

      // Return the updated attendance record
      res.json(attendance);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete attendance record
  // Handles DELETE requests to remove an attendance record from the database
  public async deleteAttendance(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the attendance record in one operation
      const attendance: IAttendance | null = await Attendance.findByIdAndDelete(
        req.params.id
      );

      // Return 404 if attendance record doesn't exist
      if (!attendance) {
        res.status(404).json({ message: "Attendance record not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Attendance record deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
