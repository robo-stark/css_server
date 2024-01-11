import express from "express";
import { getResources, getAttemptData, getMainData, getLearningResource} from './controller.js';

const dataRoutes = express.Router();


// for fetching home screen data
//{ "resourceId" : "lr", "userId" : "65781a49940763a83c7727f6" }
dataRoutes.post('/', async (req, res) =>{
	try {

		const { resourceId, userId } = req.body;
 
		let jsonData = await getMainData({resourceId, userId}); 
		res.status(200).json(jsonData); 
	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


//for cron job to keep server running
dataRoutes.get('/cron', async(req, res)=>{
	res.status(200).json({"status" : "ok"});
})



//for practice data, learning data and tests data
//{ "resoId" : "t1001", "resoType" : "t1", "userId" : "65781a49940763a83c7727f6" }
dataRoutes.post("/reso", async (req, res) => {
	try {

		let {userId, resoType, resoId} = req.body

		if (!(resoType && resoId && userId)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getResources({userId, resoType, resoId});
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


// for fetching tests attempt
//{ "resoId" : "t3001", "resoType" : "t3", "userId" : "65781a49940763a83c7727f6" }
dataRoutes.post("/reso/attempt", async (req, res) => {
	try {

		let { userId, resoType, resoId } = req.body;
		
		if (!(resoType && resoId && userId)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getAttemptData({userId, resoType, resoId });
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


//{ "assetId" : "r1av", "assetType" : "arithmetic","resoType" : "r1", "userId" : "65781a49940763a83c7727f6" }
dataRoutes.post("/asset", async (req, res) => {
	try {

		let {userId, resoType, assetType, assetId}  = req.body;
		
		if (!(assetType && assetId && userId && resoType)) {
			throw Error("Empty fields received!");
		}

		const jsonData = await getLearningResource({userId, resoType, assetType, assetId} );
		res.status(200).json(jsonData); 

	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});

/*

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
*/


export default dataRoutes;