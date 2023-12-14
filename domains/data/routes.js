import express, { json } from "express";
import { getHomeData, getLearningResource, getCategory } from './controller.js';

const dataRoutes = express.Router();


//fetch all resources home screen
dataRoutes.get("/", async (req, res) => {
	try {
		let jsonData = await getHomeData(); 
		res.status(200).json(jsonData); 
	}catch(err) {
		res.status(200).send({
			  "status": "failed",
			  "data": null,
			  "message": "server error"
		});
	}
});


dataRoutes.get("/:id", async (req, res) => {
	try {

		const catId = req.params.id;
		
		if (!catId) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getCategory(catId);
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(200).send({
			  "status": "failed",
			  "data": null,
			  "message": "server error"
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
		res.status(200).send({
			  "status": "failed",
			  "data": null,
			  "message": "server error"
		});
	}
});



export default dataRoutes;