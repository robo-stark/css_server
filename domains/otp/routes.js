import express from "express";
const otpRoutes = express.Router();
import { sendOTP, verifyOTP, deleteOTP } from './controller.js';


otpRoutes.post("/verify", async (req, res) => {
	try {
		let { email, otp } = req.body;

		const validOTP = await verifyOTP({ email, otp });
		res.status(200).json({valid : validOTP});
	}catch(err) {
		res.status(400).send(err.message);
	}
});

otpRoutes.post("/", async (req, res) => {

	try {
		const { email, subject, message, duration } = req.body;
		const createdOTP = await sendOTP({
			email,
			subject,
			message,
			duration
		});


		res.status(200).json(createdOTP);
	}
	catch (err) {
		res.status(400).send(err.message);
	}

});

export default otpRoutes;