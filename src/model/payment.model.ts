import { Mongoose } from "mongoose";
import { Application } from "express";

export default function StudentModel(app: Application) {
  const modelName = "Payment";
  const collactionName = "payments";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { ObjectId } = mongooseClient.Schema.Types;

  const schema = new mongooseClient.Schema(
    {
      flw_ref: {
        type: String,
        required: [true, "School's payment flw_ref was not provided"],
      },
      transaction_id: {
        type: String,
        unique: true,
        required: [true, "School's payment transaction_id was not provided"],
      },
      tx_ref: {
        type: String,
        unique: true,
        required: [true, "School's payment tx_ref was not provided"],
      },
      status: {
        type: String,
        required: [true, "School's payment status was not provided"],
        enum: ["completed"],
      },
      currency: {
        type: String,
        required: [true, "School's payment currency was not provided"],
        enum: ["NGN"],
      },
      amount: {
        type: Number,
        required: [true, "School's amount was not provided"],
      },
      number_of_students: {
        type: Number,
        default: 1,
        min: 1,
      },
      payment_platform: {
        type: String,
        required: [true, "Student's payment platform was not provided"],
        enum: ["flutterwave"],
      },
      school: {
        type: ObjectId,
        ref: "School",
        unique: true,
        required: [true, "School's registration ID was not provided"],
      },
      students: [{ type: ObjectId, ref: "Student", required: [true, "School registration ID is required"] }],
    },
    {
      collection: collactionName,
      timestamps: true,
    },
  );

  schema.path("tx_ref").validate(async (txRef: string) => {
    const txRefCount = await mongooseClient.model(modelName).countDocuments({
      tx_ref: txRef,
    });
    return !txRefCount;
  }, "This flw_ref has already being processed");

  schema.path("transaction_id").validate(async (transactionId: string) => {
    const flwRefefCount = await mongooseClient.model(modelName).countDocuments({
      transaction_id: transactionId,
    });
    return !flwRefefCount;
  }, "This transaction Id has already being processed");

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  app.set(modelName, mongooseClient.model(modelName, schema));
}
