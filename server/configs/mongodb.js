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
    const mongoUrl = `${process.env.MONGODB_URL}/lms`;  // Add '/lms' at the end of the connection URL.

    console.log('Attempting to connect to MongoDB with URL:', mongoUrl); // Check the full URL for correctness

    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.on('connected', () => {
            console.log('Successfully connected to MongoDB');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // You can log more details here if needed
    }
};

export default connectDB;
