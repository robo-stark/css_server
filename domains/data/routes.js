import express, { json } from "express";
import User from '../user/model.js'; 

import l10101 from "../../json/l1/speed_math.json" assert { type: "json" };
import homeJson from "../../json/home.json" assert { type: "json" };


const dataRoutes = express.Router();



dataRoutes.post("/:id", async (req, res) => {
	try {

		const subId = req.params.id;
		const { userId } = req.body;

		const jsonData = l10101;
		const userData = await User.findOne({"_id" : userId});
		//console.log(userData);

		let finished = 0;
		userData.watchedVideos.forEach((element) => {
			for (var i = 0; i < jsonData.list.length; i++){
				if (jsonData.list[i].id === element.id) {
					jsonData.list[i].watched = true
					finished += 1;
				}
			}
		});

		jsonData.finished = finished;
		//console.log(watchedData);
	
		//const data = await db.HomeModel.find({"resourceId": "h2"});
		res.status(200).json(jsonData); 
	}catch(err) {
		res.status(400).send(err.message);
	}
});

//fetch all resources home screen
dataRoutes.get("/", async (req, res) => {
	try {
		res.status(200).json(homeJson); 
	}catch(err) {
		res.status(400).send(err.message);
	}
});


/*dataRoutes.get("/:id", async (req, res) => {
	try {
		const catId = req.params.id;
		const sub = catId.slice(0, 2);
		let mData;

		if (sub == "l1") { mData = await db.LR1.find({"id" : "l1"}); }
		else if (sub == "l2") { mData = await db.LR2.find({"id" : "l2"}); }
		else if (sub == "m1") { mData = await db.M1.find({"id" : "m1"}); }
		else if (sub == "m2") { 
			mData = await db.M2.find({"id" : "m2"});
			console.log(mData); 
		}

		const element = mData[0].data.find( item => item.id === catId ); 
		   res.status(200).json(element); 
	}catch(err) {
		res.status(400).send(err.message);
	}
});
*/


/*
dataRoutes.get("/m1", async (req, res) => {
	try {
		const data = await db.M1.find({});
		res.status(200).json(data);
	}catch(err) {
		res.status(400).send(err.message);
	}
});

dataRoutes.get("/m2", async (req, res) => {
	try {
		const data = await db.M2.find({});
		res.status(200).json(data);
	}catch(err) {
		res.status(400).send(err.message);
	}
});

dataRoutes.get("/lr1", async (req, res) => {
	try {
		const data = await db.LR1.find({});
		res.status(200).json(data);
	}catch(err) {
		res.status(400).send(err.message);
	}
});

dataRoutes.get("/lr2", async (req, res) => {
	try {
		const data = await db.LR2.find({});
		res.status(200).json(data);
	}catch(err) {
		res.status(400).send(err.message);
	}
});
*/

export default dataRoutes;