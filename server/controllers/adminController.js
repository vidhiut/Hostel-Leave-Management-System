import Application from "../models/applicationModel.js";
import Student from "../models/studentModel.js";
import Warden from "../models/wardenModel.js";
import catchAsyncError from "../utils/catchAsyncError.js";


export const getProfile = catchAsyncError(async (req, res, next) => {
  const wardenId = req.user.id;

  const warden = await Warden.findById(wardenId);

  if (!warden) {
      return res.status(404).json({ success: false, message: "Warden not found" });
  }

  res.status(200).json({ success: true, data: warden });
});


export const updateProfile = catchAsyncError(async (req, res, next) => {
  
  const wardenId = req.user.id;

  const updatedData = req.body;

  const updatedWarden = await Warden.findByIdAndUpdate(wardenId, updatedData, {
      new: true, 
      runValidators: true, 
  });

  if (!updatedWarden) {
      return res.status(404).json({ success: false, message: "Warden not found" });
  }

  res.status(200).json({ success: true, data: updatedWarden });
});


export const getAllStudents = catchAsyncError(async (req, res, next) => {
  const users = await Student.find({ role: { $ne: 'admin' } }).sort({ createdAt: -1 });

  res.status(200).send({ success: true, users });
});


export const getAllApplications = catchAsyncError(async (req, res, next) => {
    const applications = await Application.find().populate('studentid').sort({createdAt: -1});
  
    res.status(200).send({ success: true, applications });
  });


  export const updateApplicationById = catchAsyncError(async(req,res,next)=>{


    const applicationId = req.params.id;
    const action = req.body;

    const updatedApplication = await Application.findByIdAndUpdate(applicationId,action,{
        new: true, 
        runValidators: true, 
    });

    if(!updatedApplication){
        return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, updatedApplication });

})
