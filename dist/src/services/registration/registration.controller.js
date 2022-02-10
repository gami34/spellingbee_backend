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
exports.registration = void 0;
const verifyTransaction_1 = require("../../utils/verifyTransaction");
const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
};
const registration = (app) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const session = yield app.get("mongooseClient").startSession();
        const varificationData = yield (0, verifyTransaction_1.verifyTransaction)(req.body.transaction_id);
        if (varificationData.status !== "success" &&
            varificationData.data.amount < req.body.amount &&
            varificationData.data.currency !== "NGN")
            return res.status(403).json({ success: false, message: "invalid transaction received" });
        const { students } = req.body;
        const newSchoolRegistration = app.get("School")({
            state: req.body.state,
            lga: req.body.lga,
            ward: req.body.ward,
            category: req.body.category,
            school_name: req.body.school_name,
            schools_head: req.body.school_head,
            schools_mobile_number: req.body.school_mobile,
            schools_address: req.body.school_address,
            schools_email: req.body.school_email,
        });
        const newPayment = app.get("Payment")({
            amount: req.body.amount,
            number_of_students: students.length,
            payment_platform: req.body.payment_platform,
            school: newSchoolRegistration.id,
            flw_ref: req.body.flw_ref,
            transaction_id: req.body.transaction_id,
            tx_ref: req.body.tx_ref,
            status: req.body.status,
            currency: req.body.currency,
        });
        try {
            const transactionResult = yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
                const studentsUUIDs = [];
                if (students.length)
                    students.forEach((student) => __awaiter(void 0, void 0, void 0, function* () {
                        const studentsRegistration = app.get("Student")({
                            students_name: student.student_name,
                            students_age: student.student_age,
                            parents_name: student.parent_name,
                            parents_number: student.parent_number,
                            parents_address: student.parent_address,
                            parents_email: student.parent_email,
                            school: newSchoolRegistration.id,
                            paymentId: newPayment.id,
                        });
                        studentsUUIDs.push(studentsRegistration.id);
                        yield studentsRegistration.save({ session });
                    }));
                newPayment.students = studentsUUIDs;
                yield newPayment.save({ session });
                newSchoolRegistration.students = studentsUUIDs;
                newSchoolRegistration.paymentId = newPayment.id;
                yield newSchoolRegistration.save({ session });
            }), transactionOptions);
            if (transactionResult) {
                yield session.commitTransaction();
            }
            else {
                session.abortTransaction();
            }
            res.json({ success: true, message: true });
        }
        catch (error) {
            const err = error;
            const splitMes = err.message.split("");
            const index = splitMes.indexOf(":");
            splitMes.splice(0, index + 1);
            const commaSeperatedMes = splitMes.join("").split(",");
            res.json({ success: false, message: commaSeperatedMes });
        }
        finally {
            session.endSession();
        }
    });
};
exports.registration = registration;
