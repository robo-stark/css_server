import express from "express";


import fs from "fs";
import path from "path";
const dataRoutes = express.Router();
const home_data_path = path.join('./domains/data/','home_data.json');
const mock_chapterwise = path.join('./domains/data/','mock_chapterwise.json');
const test_m201 = path.join('./domains/data/','test_m201.json');

dataRoutes.get("/home", async (req, res) => {
	try {
	fs.readFile(home_data_path, 'utf8', (err, data) => {
    if (err) {
	    console.error(err);
	    return res.status(500).send('Error reading data');
	}
	res.status(200).json(JSON.parse(data)); });
	
	}catch(err) {
		res.status(400).send(err.message);
	}
});

dataRoutes.get("/m2", async (req, res) => {
	try {
	fs.readFile(mock_chapterwise, 'utf8', (err, data) => {
    if (err) {
	    console.error(err);
	    return res.status(500).send('Error reading data');
	}
	res.status(200).json(JSON.parse(data)); });
	
	}catch(err) {
		res.status(400).send(err.message);
	}
});

dataRoutes.get("/m201", async (req, res) => {
	try {
	fs.readFile(test_m201, 'utf8', (err, data) => {
    if (err) {
	    console.error(err);
	    return res.status(500).send('Error reading data');
	}
	res.status(200).json(JSON.parse(data)); });
	
	}catch(err) {
		res.status(400).send(err.message);
	}
});



export default dataRoutes;