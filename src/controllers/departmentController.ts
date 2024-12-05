import { Request, Response } from "express";
import { Department } from "../models/department";
import { IDepartment } from "../interfaces/departmentInterface";
import mongoose from "mongoose";
import { validateDepartment } from "../validations/departmentValidation";

export class DepartmentController {
  // Create a new department
  // Handles POST requests to create a new department in the database
  public async createDepartment(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming department data against schema rules
      const { error, value: payload } = validateDepartment(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare department data with a new MongoDB ID
      const departmentData: IDepartment = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new department to the database
      const department = new Department(departmentData);
      const savedDepartment = await department.save();

      // Return the newly created department with 201 Created status
      res.status(201).json(savedDepartment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all departments
  // Handles GET requests to retrieve all departments from the database
  public async getAllDepartments(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all departments from the database
      const departmentList: IDepartment[] = await Department.find();
      res.json(departmentList);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get department by ID
  // Handles GET requests to retrieve a specific department by its ID
  public async getDepartmentById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find department by ID
      const department: IDepartment | null = await Department.findById(req.params.id);

      // Return 404 if department doesn't exist
      if (!department) {
        res.status(404).json({ message: "Department not found" });
        return;
      }

      // Return the found department
      res.json(department);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update department
  // Handles PUT/PATCH requests to update an existing department
  public async updateDepartment(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated department data
      const { error, value: payload } = validateDepartment(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the department and get the updated document
      const department: IDepartment | null = await Department.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if department doesn't exist
      if (!department) {
        res.status(404).json({ message: "Department not found" });
        return;
      }

      // Return the updated department
      res.json(department);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete department
  // Handles DELETE requests to remove a department from the database
  public async deleteDepartment(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the department in one operation
      const department: IDepartment | null = await Department.findByIdAndDelete(req.params.id);

      // Return 404 if department doesn't exist
      if (!department) {
        res.status(404).json({ message: "Department not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Department deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}