import express from "express";
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


dataRoutes.get("/reso/:id", async (req, res) => {
	try {

		let id  = req.params.id;
		
		if (!id) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getResource(id); 
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


dataRoutes.post("/asset", async (req, res) => {
	try {

		let {userId, resoType, resoId} = req.body

		if (!(resoType && resoId && userId)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getAsset({userId, resoType, resoId});
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

		let { userId, assetType, assetId } = req.body;
		
		if (!(assetType && assetId && userId)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getLearningResource({userId, assetType, assetId});
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

		let { userId, assetType, assetId } = req.body;
		
		if (!(assetType && assetId && userId)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getPracticeResource({userId, assetType, assetId});
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
		let { userId, assetType, assetId } = req.body;
		
		if (!(assetType && assetId && userId && dataType)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getMockResource({userId, assetType, assetId, dataType});
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