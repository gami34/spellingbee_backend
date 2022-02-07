import { Mongoose } from "mongoose";
import { Application } from "express";

export default function StudentModel(app: Application) {
  const modelName = "Student";
  const collactionName = "students";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { ObjectId } = mongooseClient.Schema.Types;

  const schema = new mongooseClient.Schema(
    {
      students_name: {
        type: String,
        required: [true, "Student's name was not provided"],
      },
      students_age: {
        type: Number,
        required: [true, "Student's age was not provided"],
      },
      parents_name: {
        type: String,
        required: [true, "Student's parent name was not provided"],
      },
      parents_number: {
        type: String,
        required: [true, "Student's parent number was not provided"],
      },
      parents_address: {
        type: String,
        required: [true, "Student's parent address was not provided"],
      },
      parents_email: {
        type: String,
        required: [true, "Student's parent email was not provided"],
      },
      school: { type: ObjectId, ref: "School", required: [true, "School registration ID is required"] },
      paymentId: { type: ObjectId, ref: "Payment", required: [true, "Payment ID is required"] },
    },
    {
      collection: collactionName,
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  app.set(modelName, mongooseClient.model(modelName, schema));
}
