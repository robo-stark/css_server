import express from "express";
const userRoutes = express.Router();
import { createNewUser , authenticateUser, updatePraticeData, updateQuestionAttemptData, updatePassword } from './controller.js';
import verifyToken from "../../middleware/auth.js";



userRoutes.post("/update/practice", async (req, res) => {
	try {

		let { userId, assetId, questionId } = req.body;
	
		if (!(userId && questionId && assetId)) {
			throw Error("Empty fields received!");
		}

		const updateResult = await updatePraticeData({userId, assetId, questionId});
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

		let { userId, assetId, questionData, resoId } = req.body;
	
		if (!(userId && questionData && assetId && resoId)) {
			throw Error("Empty fields received!");
		}

		const updateResult = await updateQuestionAttemptData({userId, assetId, questionData, resoId});
		res.status(200).json(updateResult);
	

	} catch (err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


userRoutes.post("/update/password", async (req, res) => {
	try {
		let { email, password } = req.body;

		if (!(email && password)) {
			throw Error("Empty fields received!");
		}

		const updateStatus = await updatePassword({ email, password });
		res.status(200).json(updateStatus);
	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
})


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