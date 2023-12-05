import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: './config/config.env' });

//import * as jso from '../domains/data/model.js'; 

//import testJson from "../domains/data/mock_m1.json" assert { type: "json" };

const { MONGO_URI } = process.env;

const connectToDB = async () => {
	try {
		const conn = await mongoose.connect(MONGO_URI);		
		console.log(`Db connected => ${conn.connection.host}`);
	}catch (error) {
		console.log(`connect to database error => ${error}`);
	}

}



/*const uploadData = async (data) => {
	try {
		//await jso.Mock.create(data);
	}catch(err){
		throw err;
	}
}*/

connectToDB();
//await uploadData(testJson);

