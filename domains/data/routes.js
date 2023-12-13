import express, { json } from "express";
import { getHomeData, getLearningResource } from './controller.js';

const dataRoutes = express.Router();


//fetch all resources home screen
dataRoutes.get("/", async (req, res) => {
	try {
		let jsonData = await getHomeData(); 
		res.status(200).json(jsonData); 
	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


dataRoutes.get("/lr/:id", async (req, res) => {
	try {

		const subId = req.params.id;
		
		if (!subId) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getLearningResource(subId);
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message // => change it to could not find document
		});
	}
});



export default dataRoutes;