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
function UserModel(app) {
    const modelName = "User";
    const collactionName = "users";
    const mongooseClient = app.get("mongooseClient");
    const schema = new mongooseClient.Schema({
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, "email was not provided"],
        },
        password: { type: String, required: [true, "password was not provided"] },
    }, {
        collection: collactionName,
        timestamps: true,
    });
    schema.path("email").validate((email) => __awaiter(this, void 0, void 0, function* () {
        const emailCount = yield mongooseClient.model(modelName).countDocuments({
            email,
        });
        return !emailCount;
    }), "Email already exists");
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    app.set(modelName, mongooseClient.model(modelName, schema));
}
exports.default = UserModel;
