import { Mongoose } from "mongoose";
import { Application } from "express";

export default function StudentModel(app: Application) {
  const modelName = "School";
  const collactionName = "schools";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { ObjectId } = mongooseClient.Schema.Types;

  const schema = new mongooseClient.Schema(
    {
      state: {
        type: String,
        required: [true, "School's state was not provided"],
      },
      lga: {
        type: String,
        required: [true, "School's state was not provided"],
      },
      ward: {
        type: String,
      },
      category: {
        type: String,
        required: [true, "Student's category was not provided"],
        enum: ["primary", "secondary"],
      },
      school_name: {
        type: String,
        required: [true, "School name was not provided"],
      },
      schools_head: {
        type: String,
        required: [true, "School's head name was not provided"],
      },
      schools_mobile_number: {
        type: String,
        required: [true, "School's mobile number was not provided"],
      },
      schools_address: {
        type: String,
        required: [true, "School's addresss was not provided"],
      },
      schools_email: {
        type: String,
        required: [true, "School's email was not provided"],
      },
      students: [{ type: ObjectId, ref: "Student", required: [true, "School registration ID is required"] }],
      paymentId: { type: ObjectId, ref: "Payment", unique: true, required: [true, "Payment ID is required"] },
    },
    {
      collection: collactionName,
      timestamps: true,
    },
  );

  schema.path("paymentId").validate(async (paymentId: string) => {
    const paymentIdCount = await mongooseClient.model(modelName).countDocuments({
      paymentId,
    });
    return !paymentIdCount;
  }, "paymentId already exists");

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  app.set(modelName, mongooseClient.model(modelName, schema));
}
