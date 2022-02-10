import { Application, Request, Response } from "express";
import { ErrorInterface } from "../../interfaces";
import { verifyTransaction } from "../../utils/verifyTransaction";

const transactionOptions = {
  readPreference: "primary",
  readConcern: { level: "local" },
  writeConcern: { w: "majority" },
};

export const registration = (app: Application) => {
  // return a middleware
  // eslint-disable-next-line consistent-return
  return async (req: Request, res: Response) => {
    // create a session
    const session = await app.get("mongooseClient").startSession();
    const varificationData = await verifyTransaction(req.body.transaction_id);

    if (
      varificationData.status !== "success" &&
      varificationData.data.amount < req.body.amount &&
      varificationData.data.currency !== "NGN"
    )
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
      const transactionResult = await session.withTransaction(async () => {
        const studentsUUIDs: string[] = [];
        if (students.length)
          students.forEach(async (student: any) => {
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
            // save student data
            await studentsRegistration.save({ session });
          });

        newPayment.students = studentsUUIDs;

        // save payment data
        await newPayment.save({ session });

        newSchoolRegistration.students = studentsUUIDs;
        newSchoolRegistration.paymentId = newPayment.id; // reference to payment id
        // save school data
        await newSchoolRegistration.save({ session });
      }, transactionOptions);

      if (transactionResult) {
        await session.commitTransaction();
      } else {
        session.abortTransaction();
      }

      res.json({ success: true, message: true });
    } catch (error) {
      const err = error as ErrorInterface;
      const splitMes: string[] = err.message.split("");
      const index = splitMes.indexOf(":");
      splitMes.splice(0, index + 1);
      const commaSeperatedMes = splitMes.join("").split(",");
      res.json({ success: false, message: commaSeperatedMes });
    } finally {
      session.endSession();
    }
  };
};
