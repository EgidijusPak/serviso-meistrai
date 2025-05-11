import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  emp_fname: String,
  emp_lname: String,
  emp_address: String,
  emp_position: String,
  emp_serviceName: String,
  emp_photo: String,
  emp_rating: { type: Number, default: 0 },
  likedBy: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("Employee", employeeSchema);
