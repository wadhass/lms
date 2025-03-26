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
    // Connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,    // Ensures MongoDB driver uses the latest URL parser
      useUnifiedTopology: true, // Ensures MongoDB driver uses the new topology engine
    });

    // Log successful connection
    console.log('Database connected');
  } catch (error) {
    // Log error if connection fails
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectDB;
