import Application from "../models/applicationModel.js";
import Student from "../models/studentModel.js";
import catchAsyncError from "../utils/catchAsyncError.js";


export const getApplicationById = catchAsyncError(async(req,res,next)=>{


    const applicationId = req.params.id;

    const application = await Application.findById(applicationId).populate('studentid');

    if(!application){
        return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, application });

})

export const updateApplicationById = catchAsyncError(async(req,res,next)=>{


    const applicationId = req.params.id;
    const action = req.body;

    const updatedApplication = await Application.findByIdAndUpdate(applicationId,action,{
        new: true, 
        runValidators: true, 
    }).populate('studentid');

    if(!updatedApplication){
        return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, updatedApplication });

})