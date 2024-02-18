import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Warden from "../models/wardenModel.js";
import Student from "../models/studentModel.js";
import Parent from "../models/parentsModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";

//student

export const studentRegister = catchAsyncError(async (req, res, next) => {
  const studentExists = await Student.findOne({ email: req.body.email });
  if (studentExists) {
    return next(new ErrorHandler("Student already exists", 409));
  }

  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  req.body.password = hashedPassword;

  const newStudent = new Student(req.body);

  const token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const savedStudent = await newStudent.save();

  res.status(200).send({
    message: "Student account created successfully",
    success: true,
    token: token,
    user: savedStudent, // Change from savedUser to savedStudent
  });
});

export const studentLogin = catchAsyncError(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email });

  if (!student) {
    return next(new ErrorHandler("Student does not exist", 404));
  }

  const isMatch = bcrypt.compareSync(req.body.password, student.password); // Change from user to student

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Generate the token with the student's ID
  const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).send({
    message: "Login successful",
    success: true,
    token: token,
    user: student,
  });
});


//parent

export const parentRegister = catchAsyncError(async (req, res, next) => {
  const parentExists = await Parent.findOne({ email: req.body.email });
  if (parentExists) {
    return next(new ErrorHandler("Parent already exists", 409));
  }

  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  req.body.password = hashedPassword;

  const newParent = new Parent(req.body);

  const token = jwt.sign({ id: newParent._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const savedParent = await newParent.save();

  res.status(200).send({
    message: "Parent account created successfully",
    success: true,
    token: token,
    user: savedParent,
  });
});

export const parentLogin = catchAsyncError(async (req, res, next) => {
  const parent = await Parent.findOne({ email: req.body.email });

  if (!parent) {
    return next(new ErrorHandler("Parent does not exist", 404));
  }

  const isMatch = bcrypt.compareSync(req.body.password, parent.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = jwt.sign({ id: parent._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).send({
    message: "Login successful",
    success: true,
    token: token,
    user: parent,
  });
});
//warden
export const wardenRegister = catchAsyncError(async (req, res, next) => {
  const wardenExists = await Warden.findOne({ email: req.body.email });
  if (wardenExists) {
    return next(new ErrorHandler("Warden already exists", 409));
  }

  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  req.body.password = hashedPassword;

  const newWarden = new Warden(req.body);

  const token = jwt.sign({ id: newWarden._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const savedWarden = await newWarden.save();

  res.status(200).send({
    message: "Warden account created successfully",
    success: true,
    token: token,
    user: savedWarden,
  });
});

export const wardenLogin = catchAsyncError(async (req, res, next) => {
  const warden = await Warden.findOne({ email: req.body.email });

  if (!warden) {
    return next(new ErrorHandler("Warden does not exist", 404));
  }

  const isMatch = bcrypt.compareSync(req.body.password, warden.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = jwt.sign({ id: warden._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).send({
    message: "Login successful",
    success: true,
    token: token,
    user: warden,
  });
});

