import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
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
      },userType:{
        type:String,
        default:'parent'
      }
},{
    timestamps:true,
});

const parentModel = mongoose.model("parents",parentSchema);

export default parentModel;