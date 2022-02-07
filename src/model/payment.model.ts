import { Mongoose } from "mongoose";
import { Application } from "express";

export default function StudentModel(app: Application) {
  const modelName = "Payment";
  const collactionName = "payments";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { ObjectId } = mongooseClient.Schema.Types;

  const schema = new mongooseClient.Schema(
    {
      paymentId: {
        type: String,
        required: [true, "School's payment ID was not provided"],
      },
      amount: {
        type: String,
        required: [true, "School's amount was not provided"],
      },
      number_of_students: {
        type: Number,
        default: 1,
        min: 1,
      },
      payment_platform: {
        type: String,
        required: [true, "Student's category was not provided"],
      },
      schools_head: {
        type: String,
        required: [true, "School's registration ID was not provided"],
      },
      school: {
        type: ObjectId,
        ref: "School",
        required: [true, "School name was not provided"],
      },
      students: [{ type: ObjectId, ref: "Student", required: [true, "School registration ID is required"] }],
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
