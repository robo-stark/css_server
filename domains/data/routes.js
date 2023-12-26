import express, { json } from "express";
import { getHomeData, getResource, getCategory, getPracticeQuestion, getMockQuestion, getSectionalQuestion} from './controller.js';

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


dataRoutes.get("/:id", async (req, res) => {
	try {

		const catId = req.params.id;
		
		if (!catId) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getCategory(catId);
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": "server error"
		});
	}
});


// data/pr/p101
dataRoutes.get("/:type/:id", async (req, res) => {
	try {

		const type = req.params.type;
		const subId = req.params.id;
		
		if (!(type && subId)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getResource({type, subId});
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

		const jsonData = await getPracticeQuestion({userId, type, subId});
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

		let dataType = req.params.dataType
		let { userId, type, subId } = req.body;
		
		if (!(type && subId && userId)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getMockQuestion({userId, type, subId, dataType});
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