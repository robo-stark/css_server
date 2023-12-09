import express from "express";
import * as db from './model.js'; 

const dataRoutes = express.Router();


//fetch all resources home screen
dataRoutes.get("/", async (req, res) => {
	try {
		const data = await db.HomeModel.find({});
		res.status(200).json(data); 
	}catch(err) {
		res.status(400).send(err.message);
	}
});


dataRoutes.get("/:id", async (req, res) => {
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