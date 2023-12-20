import express from "express";
const userRoutes = express.Router();
import { createNewUser , authenticateUser, updatePraticeData, updateQuestionAttemptData } from './controller.js';
import verifyToken from "../../middleware/auth.js";



userRoutes.post("/update/practice", async (req, res) => {
	try {

		let { userId, type, subId } = req.body;
	
		if (!(userId && subId && type)) {
			throw Error("Empty fields received!");
		}

		const updateResult = await updatePraticeData({userId, type, subId});
		res.status(200).json(updateResult);
	

	} catch (err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


userRoutes.post("/update/attempt", async (req, res) => {
	try {

		let { userId, type, questionData } = req.body;
	
		if (!(userId && questionData && type)) {
			throw Error("Empty fields received!");
		}

		const updateResult = await updateQuestionAttemptData({userId, type, questionData});
		res.status(200).json(updateResult);
	

	} catch (err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});



//Login
userRoutes.post("/login", async (req, res) => {
	try {
		let { email, password } = req.body;
		email = email.trim();
		password = password.trim();

		if (!(email && password)) {
			throw Error("Empty credentials supplied!");
		}

		const authUser = await authenticateUser({email, password});

		res.status(200).json(authUser);

	} catch (err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


//Signup
userRoutes.post("/signup", async (req, res) => {
	try {
		let { email, password } = req.body;
		email = email.trim();
		password = password.trim();

		if (!(email && password)) {
			throw Error("Empty input fields!");
		} else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			throw Error("Invalid email entered");
		} else if (password.length < 6) {
			throw Error("Password should be greater than 6 characters");
		} else {
			const newUser = await createNewUser({
				email, password
			});
			res.status(200).json(newUser);
		}

	}catch (err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});

export default userRoutes;