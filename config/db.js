import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: './config/config.env' });

import { Home, Mock, Test } from '../domains/data/model.js'; 
//import homeJson from "../domains/data/home.json" assert { type: "json" };
//import mockJson from "../domains/data/mock_chapterwise.json" assert { type: "json" };
import testJson from "../domains/data/test_m201.json" assert { type: "json" };

const { MONGO_URI } = process.env;


const connectToDB = async () => {
	try {
		const conn = await mongoose.connect(MONGO_URI);
		console.log(`Db connected => ${conn.connection.host}`);
	}catch (error) {
		console.log(`connect to database error => ${error}`);
	}

};


const uploadData = async (data) => {
	try {
		//await Test.create(data);
	}catch(err){
		throw err;
	}
}


connectToDB();
//await uploadData(testJson);

