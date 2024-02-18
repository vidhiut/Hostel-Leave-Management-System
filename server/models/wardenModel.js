import mongoose from "mongoose";

const wardenSchema = new mongoose.Schema({
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
      },role:{
        type:String,
        default:'admin'
      }
},{
    timestamps:true,
});

const wardenModel = mongoose.model("wardens",wardenSchema);

export default wardenModel;