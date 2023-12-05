import express from "express";
import * as db from './model.js'; 

const dataRoutes = express.Router();



dataRoutes.get("/home", async (req, res) => {
	try {
		const data = await db.Home.find({});
		res.status(200).json(data); 
	}catch(err) {
		res.status(400).send(err.message);
	}
});

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


export default dataRoutes;