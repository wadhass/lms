import mongoose from "mongoose";

// Connect to the mongoDB database

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('Database connected');
      });

    await mongoose.connect(`${process.env.MONGODB_URL}/lms`)
}

export default connectDB;