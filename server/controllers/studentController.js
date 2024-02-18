import Application from "../models/applicationModel.js";
import Student from "../models/studentModel.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import generateEmail from "../utils/emailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getStudentProfile = catchAsyncError(async (req, res, next) => {
    const studentId = req.user.id;

    const student = await Student.findById(studentId);

    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
});


export const updateStudentProfile = catchAsyncError(async (req, res, next) => {
    const studentId = req.user.id;

    const updatedData = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, {
        new: true, 
        runValidators: true, 
    });

    if (!updatedStudent) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: updatedStudent });
});


export const getApplications = catchAsyncError(async (req,res,next)=>{
    const studentId = req.user.id;

    const applications = await Application.find({studentid: studentId}).sort({createdAt: -1});

    if (!applications) {
        return res.status(404).json({ success: false, message: "Applications not found" });
    }

    res.status(200).json({ success: true, applications });

});

export const submitApplication = catchAsyncError(async (req, res, next) => {
    const studentId = req.user.id;

    const student = await Student.findById(studentId);

    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    const applicationData = req.body;

    applicationData.studentid = studentId;

    const newApplication = await Application.create(applicationData);

    const url = `${req.get("origin")}/parent-approval/application/${newApplication._id}`;
    const emailData = {
        name: student.parentname,
        childname: student.firstname + " " + student.lastname,
        applicationURL: url,
    };

    const parentEmail = student.parentemail;

    // Generate the HTML email content
    const htmlContent = await generateEmail(emailData);

   // console.log(htmlContent)

    try {
        // Send the email
        await sendEmail(parentEmail, 'New Leave request', htmlContent);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        // Handle the email sending error if needed
    }

    res.status(201).json({ success: true, data: newApplication });
});

