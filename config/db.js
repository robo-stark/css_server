import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: './config/config.env' });

import * as jso from '../domains/data/model.js'; 

//import testJson from "../json/njson.json" assert { type: "json" };

const { MONGO_URI } = process.env;

const connectToDB = async () => {
	try {
		const conn = await mongoose.connect(MONGO_URI);		
		console.log(`Db connected => ${conn.connection.host}`);
	}catch (error) {
		console.log(`connect to database error => ${error}`);
	}

}


let dat = {
      "id": "lr203",
      "category": "Cubic Equations",
      "count": 3,
        "list" : [
              {
                "number" : 1,
                "name" : "Cubic Equations 1",
                "link" : "https://www.youtube.com/watch?v=NDe4t_eO_mE",
                "type": "l"
              },
              {
                "number" : 2,
                "name" : "Cubic Equations 2",
                "link" : "https://www.youtube.com/watch?v=nYJpeFaon9Y",
                "type": "l"
              },
              {
                "number" : 3,
                "name" : "Cubic Equations 3",
                "link" : "https://www.youtube.com/watch?v=vG-Z3bagJek",
                "type": "l"
              }
            ]
    }

//push to array
const pushToResource = async(mData) => {
	try{
		await jso.HomeModel.updateOne({ id: "lr2" }, { $push: { data: mData } });
		console.log("saved");
	}catch(err) {
		console.log(err);
	}
}


//update to nested array
const updateTwoLevelNested = async() => {
	try{
		await jso.HomeModel.updateOne(
			{ "data.list._id": "6572625228abadedcf3f42ea" },
			{ $set: { "data.$[].list.$[e2].name" :  "Bhang bhosda"}},
			{ arrayFilters: [ {"e2._id" : "6572625228abadedcf3f42ea"}]  }
		 );
		console.log("deleted probably");
	}catch(err) {
		console.log(err);
	}
}

//update to nested array
const updateOneLevelNested = async() => {
	try{
		await jso.HomeModel.updateOne(
			{ "data.id" : "lr201" },
			{ $set: {"data.$.count" : 99}  }
		 );
		console.log("updated");
	}catch(err) {
		console.log(err);
	}
}


//pull from array
const pullFromResource = async() => {
	try{
		await jso.HomeModel.updateOne({ id: "lr2" }, { pull: { data: { id : "lr202"} } } );
		console.log("deleted");
	}catch(err) {
		console.log(err);
	}
}

const uploadData = async (data) => {
	try {
		await jso.HomeModel.create(data);
	}catch(err){
		throw err;
	}
}


await connectToDB();
//await uploadData(testJson);
//await pushToResource(dat);
//await pullFromResource();
//await updateOneLevelNested()
//await updateTwoLevelNested();
