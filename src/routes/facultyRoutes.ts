import express from "express";
import { FacultyController } from "../controllers/facultyController";
import { authMiddleware } from "../middleware/authMiddleware";

// Initialize express Router
const router = express.Router();
// Create instance of FacultyController to handle route logic
const facultyController = new FacultyController();

/**
 * @swagger
 * tags:
 *   name: Faculty
 *   description: Faculty management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Faculty:
 *       type: object
 *       properties:
 *         Faculty_ID:
 *           type: number
 *           description: Id of the faculty member
 *           example: "FAC-001"
 *         First_Name:
 *           type: string
 *           description: First name of the faculty member
 *           example: "John"
 *         Last_Name:
 *           type: string
 *           description: Last name of the faculty member
 *           example: "Doe"
 *         Gender:
 *           type: string
 *           enum:
 *             - Male
 *             - Female
 *             - Other
 *           description: Gender of the faculty member
 *           example: "Male"
 *         Age:
 *           type: integer
 *           description: Age of the faculty member
 *           example: 35
 *         Email:
 *           type: string
 *           format: email
 *           description: Email address of the faculty member
 *           example: "john.doe@example.com"
 *         Contact:
 *           type: string
 *           description: Contact number of the faculty member
 *           example: "09171234567"
 *         Faculty_Role:
 *           type: string
 *           description: Role of the faculty member
 *           example: "Professor"
 *         Department_ID:
 *           type: number
 *           description: Foreign Key to the Department
 *           example: "DPT-001"
 *         Leave_ID:
 *           type: number
 *           description: Foreign Key to the Leave
 *           example: "LV-001"
 *         Attendance_ID:
 *           type: number
 *           description: Foreign Key to the Attendance
 *           example: "ATT-001"
 *         Student_Grade:
 *           type: string
 *           description: Grade assigned by the faculty member
 *           example: "A"
 *       required:
 *         - Faculty_ID
 *         - First_Name
 *         - Last_Name
 *         - Gender
 *         - Age
 *         - Email
 *         - Contact
 *         - Faculty_Role
 *         - Department_ID
 *
 *     FacultyResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the faculty member
 *           example: "FAC-001"
 *         First_Name:
 *           type: string
 *           example: "John"
 *         Last_Name:
 *           type: string
 *           example: "Doe"
 *         Gender:
 *           type: string
 *           example: "Male"
 *         Age:
 *           type: integer
 *           example: 35
 *         Email:
 *           type: string
 *           example: "john.doe@example.com"
 *         Contact:
 *           type: string
 *           example: "09171234567"
 *         Faculty_Role:
 *           type: string
 *           example: "Professor"
 *         Department_ID:
 *           type: string
 *           example: "DPT-001"
 *         Leave_ID:
 *           type: string
 *           example: "LV-001"
 *         Attendance_ID:
 *           type: string
 *           example: "ATT-001"
 *         Student_Grade:
 *           type: string
 *           example: "A"
 */

/**
 * @swagger
 * /api/faculty:
 *   post:
 *     summary: Create a new faculty member
 *     tags: [Faculty]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Faculty'
 *     responses:
 *       201:
 *         description: Faculty member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacultyResponse'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Faculty member already exists
 * 
 *   get:
 *     summary: Get all faculty members
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of faculty members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FacultyResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 */

/**
 * @swagger
 * /api/faculty/{id}:
 *   get:
 *     summary: Get faculty member by ID
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Faculty ID
 *     responses:
 *       200:
 *         description: Faculty member details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacultyResponse'
 *       404:
 *         description: Faculty member not found
 *   put:
 *     summary: Update faculty member
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Faculty ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Faculty'
 *     responses:
 *       200:
 *         description: Faculty member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacultyResponse'
 *       404:
 *         description: Faculty member not found
 *   delete:
 *     summary: Delete faculty member
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Faculty ID
 *     responses:
 *       204:
 *         description: Faculty member deleted successfully
 *       404:
 *         description: Faculty member not found
 */

// Faculty Routes:

// POST /api/faculty
// Creates a new faculty member
// Request body should contain faculty details (email, password, firstName, lastName)
router.post("/api/faculty", authMiddleware, facultyController.createFaculty);

// GET /api/faculty
// Retrieves all faculty members from the database
// Returns array of faculty members (passwords excluded)
router.get("/api/faculty", authMiddleware, facultyController.getAllFaculty);

// GET /api/faculty/:id
// Retrieves a specific faculty member by their ID
// :id - MongoDB ObjectId of the faculty member
router.get("/api/faculty/:id", authMiddleware, facultyController.getFacultyById);

// PUT /api/faculty/:id
// Updates an existing faculty member's information
// :id - MongoDB ObjectId of the faculty member to update
// Request body should contain updated faculty details
router.put("/api/faculty/:id", authMiddleware, facultyController.updateFaculty);

// DELETE /api/faculty/:id
// Removes a faculty member from the database
// :id - MongoDB ObjectId of the faculty member to delete
router.delete("/api/faculty/:id", authMiddleware, facultyController.deleteFaculty);

// Export the router for use in main application
export default router;
