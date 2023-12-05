import express from "express";
import { Home, Mock, Test } from './model.js'; 

const dataRoutes = express.Router();



dataRoutes.get("/home", async (req, res) => {
	try {
		const data = await Home.find({});
		res.status(200).json(data); 
	}catch(err) {
		res.status(400).send(err.message);
	}
});

dataRoutes.get("/m2", async (req, res) => {
	try {
		const data = await Mock.find({});
		res.status(200).json(data);
	}catch(err) {
		res.status(400).send(err.message);
	}
});

dataRoutes.get("/m201", async (req, res) => {
	try {
		const data = await Test.find({});
		res.status(200).json(data);
	}catch(err) {
		res.status(400).send(err.message);
	}
});



export default dataRoutes;