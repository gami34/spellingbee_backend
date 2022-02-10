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
    const modelName = "Payment";
    const collactionName = "payments";
    const mongooseClient = app.get("mongooseClient");
    const { ObjectId } = mongooseClient.Schema.Types;
    const schema = new mongooseClient.Schema({
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
    }, {
        collection: collactionName,
        timestamps: true,
    });
    schema.path("tx_ref").validate((txRef) => __awaiter(this, void 0, void 0, function* () {
        const txRefCount = yield mongooseClient.model(modelName).countDocuments({
            tx_ref: txRef,
        });
        return !txRefCount;
    }), "This flw_ref has already being processed");
    schema.path("transaction_id").validate((transactionId) => __awaiter(this, void 0, void 0, function* () {
        const flwRefefCount = yield mongooseClient.model(modelName).countDocuments({
            transaction_id: transactionId,
        });
        return !flwRefefCount;
    }), "This transaction Id has already being processed");
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    app.set(modelName, mongooseClient.model(modelName, schema));
}
exports.default = StudentModel;
