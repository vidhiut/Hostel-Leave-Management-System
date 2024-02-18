import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      mobile: {
        type: Number,
        required: true,
      },
      parentname:{
        type: String,
        required: true,
      },
      parentemail:{
        type: String,
        required: true,
      },
      parentmobile:{
        type:Number,
        required:true,
      },      
      role:{
        type:String,
        default:'student'
      }
},{
    timestamps:true,
});

const studentModel = mongoose.model("Students",studentSchema);

export default studentModel;