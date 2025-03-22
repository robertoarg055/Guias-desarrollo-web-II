import mongoose from "mongoose";
import 'dotenv/config';

export const connectBD = async () => {
    try {
        const url = process.env.DATABASE_URL;
        const connection = await mongoose.connect(url);
        console.log('Mongo conectado');
    } 
    catch (error) {
        console.log(error.message);
    }
};