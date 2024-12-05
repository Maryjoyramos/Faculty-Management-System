import { Request, Response } from "express";
import { Leave } from "../models/leave";
import { ILeave } from "../interfaces/leaveInterface";
import mongoose from "mongoose";
import { validateLeave } from "../validations/leaveValidation";

export class LeaveController {
  // Create a new leave
  // Handles POST requests to create a new leave in the database
  public async createLeave(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming leave data against schema rules
      const { error, value: payload } = validateLeave(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare leave data with a new MongoDB ID
      const leaveData: ILeave = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new leave to the database
      const leave = new Leave(leaveData);
      const savedLeave = await leave.save();

      // Return the newly created leave with 201 Created status
      res.status(201).json(savedLeave);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all leaves
  // Handles GET requests to retrieve all leaves from the database
  public async getAllLeaves(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all leaves from database
      const leaveList: ILeave[] = await Leave.find();
      res.json(leaveList);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get leave by ID
  // Handles GET requests to retrieve a specific leave by its ID
  public async getLeaveById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find leave by ID
      const leave: ILeave | null = await Leave.findById(req.params.id);

      // Return 404 if leave doesn't exist
      if (!leave) {
        res.status(404).json({ message: "Leave not found" });
        return;
      }

      // Return the found leave
      res.json(leave);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update leave
  // Handles PUT/PATCH requests to update an existing leave
  public async updateLeave(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated leave data
      const { error, value: payload } = validateLeave(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the leave and get the updated document
      const leave: ILeave | null = await Leave.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if leave doesn't exist
      if (!leave) {
        res.status(404).json({ message: "Leave not found" });
        return;
      }

      // Return the updated leave
      res.json(leave);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete leave
  // Handles DELETE requests to remove a leave from the database
  public async deleteLeave(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the leave in one operation
      const leave: ILeave | null = await Leave.findByIdAndDelete(req.params.id);

      // Return 404 if leave doesn't exist
      if (!leave) {
        res.status(404).json({ message: "Leave not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Leave deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}