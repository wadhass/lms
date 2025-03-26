// import mongoose from "mongoose";

// // Connect to the mongoDB database

// const connectDB = async () => {
//     mongoose.connection.on('connected', () => {
//         console.log('Database connected');
//       });

//     await mongoose.connect(`${process.env.MONGODB_URL}/lms`)
// }

// export default connectDB;


import mongoose from 'mongoose';

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    // Check if the MONGODB_URL environment variable is defined
    if (!process.env.MONGODB_URL) {
      console.error('MongoDB connection string is missing. Please define MONGODB_URL in your environment variables.');
      process.exit(1); // Exit the process if MONGODB_URL is not defined
    }

    // Connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGODB_URL);

    // Log successful connection
    console.log('Database connected successfully');
  } catch (error) {
    // Log error if connection fails
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectDB;

