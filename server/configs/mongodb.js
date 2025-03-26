import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectionString = "mongodb+srv://ahmedhassan:1y7K5blbXcwlV2Qj@cluster0.rhdld.mongodb.net/lms";
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectDB;
