import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


const app = express();
dotenv.config();


const connect = async () => {
//connect to mongodb
try {
    mongoose.connect(process.env.MONGO, {
    });
    console.log("MongoDB connected");
} catch (error) {
    console.log(error);
}

};


app.listen(8800, () => {
    connect();
    console.log("Backend server is running!");
});