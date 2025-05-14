import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export const connectDB = async () => {
    try{
    const conn = await mongoose.connect("mongodb+srv://irisarolande125:yXheQAEX3ne3rzob@cluster0.sb5mjpp.mongodb.net/books_db?retryWrites=true&w=majority&appName=Cluster0");
        console.log('MongoDB connected successfully');
    }catch (error) {    
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
}