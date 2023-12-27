import express, { request } from "express";
import { getHomeData, getResource, getAsset, getLearningResource, getPracticeResource, getMockResource} from './controller.js';

const dataRoutes = express.Router();


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


dataRoutes.get("/:subId", async (req, res) => {
	try {

		let subId  = req.params.subId;
		
		if (!subId) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getResource(subId); 
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


dataRoutes.get("/:type/:subId", async (req, res) => {
	try {

		let type = req.params.type;
		let subId = req.params.subId;
		
		if (!(type && subId)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getAsset({type, subId});
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


dataRoutes.post("/lr", async (req, res) => {
	try {

		let { userId, type, subId } = req.body;
		
		if (!(type && subId && userId)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getLearningResource({userId, type, subId});
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});



dataRoutes.post("/pr", async (req, res) => {
	try {

		let { userId, type, subId } = req.body;
		
		if (!(type && subId && userId)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getPracticeResource({userId, type, subId});
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


dataRoutes.post("/mr/:dataType", async (req, res) => {
	try {

		const dataType = req.params.dataType;
		let { userId, type, subId } = req.body;
		
		if (!(type && subId && userId && dataType)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getMockResource({userId, type, subId, dataType});
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});

export default dataRoutes;