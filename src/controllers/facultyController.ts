import { Request, Response } from "express";
import { Faculty } from "../models/faculty";
import { IFaculty } from "../interfaces/facultyInterface";
import mongoose from "mongoose";
import { validateFaculty } from "../validations/facultyValidation";
import bcrypt from "bcrypt";

export class FacultyController {
  // Create a new faculty
  // Handles POST requests to create a new faculty in the database
  public async createFaculty(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming faculty data against schema rules
      const { error, value: payload } = validateFaculty(req.body);
      if (error) {
        // Return early if validation fails, sending back specific error messages
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }


      // Prepare faculty data with a new MongoDB ID and the hashed password
      const facultyData: IFaculty = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new faculty to the database
      const faculty = new Faculty(facultyData);
      const savedFaculty = await faculty.save();

      // Return the newly created faculty with 201 Created status
      res.status(201).json(savedFaculty);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all faculty members
  // Handles GET requests to retrieve all faculty members from the database
  public async getAllFaculty(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all faculty members from database, excluding sensitive password field
      const facultyList: IFaculty[] = await Faculty.find().select("-password");
      res.json(facultyList);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get faculty by ID
  // Handles GET requests to retrieve a specific faculty member by their ID
  public async getFacultyById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find faculty by ID, excluding password field
      const faculty: IFaculty | null = await Faculty.findById(req.params.id).select(
        "-password"
      );

      // Return 404 if faculty doesn't exist
      if (!faculty) {
        res.status(404).json({ message: "Faculty not found" });
        return;
      }

      // Return the found faculty
      res.json(faculty);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update faculty
  // Handles PUT/PATCH requests to update an existing faculty
  public async updateFaculty(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated faculty data
      const { error, value: payload } = validateFaculty(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Hash the new password if it's being updated
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload.password, salt);

      // Prepare update data with hashed password
      const facultyData: Partial<IFaculty> = { ...payload, password: hashedPassword };

      // Update the faculty and get the updated document
      const faculty: IFaculty | null = await Faculty.findByIdAndUpdate(
        req.params.id,
        facultyData,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if faculty doesn't exist
      if (!faculty) {
        res.status(404).json({ message: "Faculty not found" });
        return;
      }

      // Remove password from response data for security
      let withoutPassword = faculty.toJSON();
      delete withoutPassword.password;

      // Return the updated faculty without password
      res.json(withoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete faculty
  // Handles DELETE requests to remove a faculty from the database
  public async deleteFaculty(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the faculty in one operation
      const faculty: IFaculty | null = await Faculty.findByIdAndDelete(req.params.id);

      // Return 404 if faculty doesn't exist
      if (!faculty) {
        res.status(404).json({ message: "Faculty not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Faculty deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
