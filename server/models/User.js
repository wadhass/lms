// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//     {
//         _id: {type: String, required: true},
//         name: {type: String, required: true},
//         email: {type: String, required: true},
//         imageUrl: {type: String, required: true},
//         enrolledCourses: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Course',
//             }
//         ]
//     }, {timestamps: true});

//     const User = mongoose.model('User', userSchema);

//     export default User





import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Clerk user ID

    name: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: { type: String, required: true },

    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      }
    ]
  },
  { timestamps: true }
);

// ✅ Export the model
const User = mongoose.model('User', userSchema);
export default User;
