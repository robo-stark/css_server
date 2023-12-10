import express from "express";
const userRoutes = express.Router();
import { createNewUser , authenticateUser, updateWatchedVideo } from './controller.js';
import verifyToken from "../../middleware/auth.js";

// protected route
userRoutes.get("/private_data", verifyToken, (req, res) => {
	res.status(200).send("You are in the private territory");
});

/*//Get Home Data
userRoutes.get("/home", verifyToken, (req, res) => {
	res.status(200).send("You are in the private territory");
});*/


//Login
userRoutes.post("/watched", async (req, res) => {
	try {

		/*const id = "l1sm1"
		const userId = "657521537a5e86254f7fba8d";*/

		let { userId, videoId } = req.body;

		if (!(videoId && userId)) {
			throw Error("Something went wrong!");
		}

		const updateResult = await updateWatchedVideo({userId, videoId});
		res.status(200).json(updateResult);

	} catch (err) {
		res.status(400).send(err.message);
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
		res.status(400).send(err.message);
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
		res.status(400).send(err.message);
	}
});

export default userRoutes;