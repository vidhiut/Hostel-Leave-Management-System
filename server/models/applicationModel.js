
import mongoose from "mongoose";


const applicationSchema = new mongoose.Schema(
{

    studentid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Students",
        required: true,
    },
    subject:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,

    },
    fromdate:{
        type: Date,
        required: true,
    },
    todate:{
        type: Date,
        required: true,
    },
    parentapproval:{
        type: String,
        enum:["Approved","Pending","Rejected"],
        default: "Pending",
    },
    wardenapproval:{
        type: String,
        enum:["Approved","Pending","Rejected"],
        default: "Pending",
    }

},{
    timestamps:true
}

)

const applicationModel = mongoose.model("applications",applicationSchema);

export default applicationModel