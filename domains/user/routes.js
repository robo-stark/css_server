import express from "express";
const userRoutes = express.Router();
import { createNewUser , authenticateUser, updateWatchedVideo } from './controller.js';
import verifyToken from "../../middleware/auth.js";


//Update Watched Data
userRoutes.post("/watched", verifyToken, async (req, res) => {
	try {

		let { userId, subId } = req.body;
	
		if (!(videoId && subId)) {
			throw Error("Empty fields received!");
		}

		const updateResult = await updateWatchedVideo({userId, subId});
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