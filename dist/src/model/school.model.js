"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function StudentModel(app) {
    const modelName = "School";
    const collactionName = "schools";
    const mongooseClient = app.get("mongooseClient");
    const { ObjectId } = mongooseClient.Schema.Types;
    const schema = new mongooseClient.Schema({
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
    }, {
        collection: collactionName,
        timestamps: true,
    });
    schema.path("paymentId").validate((paymentId) => __awaiter(this, void 0, void 0, function* () {
        const paymentIdCount = yield mongooseClient.model(modelName).countDocuments({
            paymentId,
        });
        return !paymentIdCount;
    }), "paymentId already exists");
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    app.set(modelName, mongooseClient.model(modelName, schema));
}
exports.default = StudentModel;
