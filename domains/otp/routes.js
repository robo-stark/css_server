import express from "express";
import User from '../user/model.js'; 
const otpRoutes = express.Router();
import { sendOTP, verifyOTP, deleteOTP, forgotPasswordOTP } from './controller.js';


otpRoutes.post("/verify/email", async (req, res) => {
	try {
		let { email, otp } = req.body;

		const validOTP = await verifyOTP({ email, otp });
		if (validOTP) {
			res.status(200).json({
			  "status": "success",
			  "data": null,
			  "message": "email verified successfully"
			});
		}else{ 
			throw Error("email cannot be verified");
			//log error; 
		}
		
	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});


otpRoutes.post("/verify/change", async (req, res) => {
	try {
		let { email, otp } = req.body;

		const validOTP = await verifyOTP({ email, otp });

		if (validOTP) {
			await User.updateOne({email : email},
				{$set : { canChangePassword : true}
			});

			res.status(200).json({
			"status": "success",
			"data": null,
			"message": "otp validated"
		});
			
		}else{
			throw Error("failed to verify otp try again later"); //-> log here
		}
	}catch(err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}
});

otpRoutes.post("/forgot", async (req, res) => {
	try {
		const { email } = req.body;
		const createdOTP = await forgotPasswordOTP(email);

		res.status(200).json({
			"status": "success",
			"data": null,
			"message": "Otp sent successfully"
		});
	}
	catch (err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}

})

otpRoutes.post("/", async (req, res) => {

	try {
		const { email } = req.body;
		const createdOTP = await sendOTP(email);

		res.status(200).json({
			"status": "success",
			"data": null,
			"message": "Otp sent successfully"
		});
	}
	catch (err) {
		res.status(400).send({
			  "status": "failed",
			  "data": null,
			  "message": err.message
		});
	}

});

export default otpRoutes;