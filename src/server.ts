import http from "http";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import "./config/logging";
import { DEVELOPMENT, mongo, server } from "./config/config";

import "reflect-metadata";

import { corsHandler } from "./middleware/corsHandler";
import { loggingHandler } from "./middleware/loggingHandler";
import { errorNotFound } from "./middleware/errorNotFound";
import { specs } from "./config/swagger";
import attendanceRoutes from "./routes/attendanceRoutes";
import authRoutes from "./routes/authRoutes";
import departmentRoutes from "./routes/departmentRoutes";
import facultyRoutes from "./routes/facultyRoutes";
import leaveRoutes from "./routes/leaveRoutes";
import userRoutes from "./routes/userRoutes";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
  logging.log("----------------------------------------");
  logging.log("Initializing API");
  logging.log("----------------------------------------");
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  logging.log("----------------------------------------");
  logging.log("Swagger UI");
  logging.log("----------------------------------------");
  application.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Your API Documentation",
    })
  );

  logging.log("----------------------------------------");
  logging.log("Connect to Mongo");
  logging.log("----------------------------------------");
  try {
    const connection = await mongoose.connect(
      mongo.MONGO_CONNECTION,
      mongo.MONGO_OPTIONS
    );
    logging.log("----------------------------------------");
    logging.log("Connected to Mongo: ", connection.version);
    logging.log("----------------------------------------");
  } catch (error) {
    logging.log("----------------------------------------");
    logging.error(error);
    logging.error("Unable to connect to Mongo");
    logging.log("----------------------------------------");
  }

  logging.log("----------------------------------------");
  logging.log("Logging & Configuration");
  logging.log("----------------------------------------");
  application.use(loggingHandler);
  application.use(corsHandler);

  logging.log("----------------------------------------");
  logging.log("Define Controller Routing");
  logging.log("---------------------  -------------------");
  application.use(authRoutes);  
  application.use(attendanceRoutes);  
  application.use(authRoutes);
  application.use(departmentRoutes);
  application.use(facultyRoutes);
  application.use(leaveRoutes);
  application.use(userRoutes);
  
  logging.log("----------------------------------------");
  logging.log("Starting Server");
  logging.log("----------------------------------------");
  httpServer = http.createServer(application);
  httpServer.listen(server.SERVER_PORT, () => {
    logging.log("----------------------------------------");
    logging.log(
      `Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`
    );
    logging.log("----------------------------------------");
  });
};

export const Shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);

Main();
