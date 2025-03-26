import mongoose from 'mongoose';

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    // Ensure the MONGODB_URL environment variable is defined
    if (!process.env.MONGODB_URL) {
      console.error('MongoDB connection string is missing. Please define MONGODB_URL in your environment variables.');
      process.exit(1); // Exit the process if the connection string is missing
    }

    // Connect to MongoDB using the connection string from environment variables
    await mongoose.connect(`${process.env.MONGODB_URL}/lms`, {
      useNewUrlParser: true,   // Ensures MongoDB driver uses the latest URL parser
      useUnifiedTopology: true, // Ensures MongoDB driver uses the new topology engine
    });

    // Log successful connection
    console.log('Database connected successfully');
  } catch (error) {
    // Log error if connection fails
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectDB;
