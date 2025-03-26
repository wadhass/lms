// import mongoose from "mongoose";

// // Connect to the mongoDB database

// const connectDB = async () => {
//     mongoose.connection.on('connected', () => {
//         console.log('Database connected');
//       });

//     await mongoose.connect(`${process.env.MONGODB_URL}/lms`)
// }

// export default connectDB;


import mongoose from "mongoose";

// Connect to the MongoDB database
const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('Database connected successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

    await mongoose.connect(`${process.env.MONGODB_URL}/lms`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

export default connectDB;
