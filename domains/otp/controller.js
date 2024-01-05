import OTP from './model.js'
import generateOTP from '../../util/generateOTP.js';
import { sendEmail } from '../../util/nodemail.js';
import { hashData, verifyHashData } from './../../util/hashData.js';
const { AUTH_EMAIL } = process.env;

const EMAIL_SENDER_NAME = "Cat Self Study";

const deleteOTP = async(email) => {
	try{
		await OTP.deleteOne({email});
	}catch(err){
		throw err;
	}
};

const verifyOTP = async({ email, otp }) => {
	try{
		if (!(email && otp)) {
			throw Error("Provide values for email or otp");
		}

		const matchedOTPRecord = await OTP.findOne({email});

		if (!matchedOTPRecord){
			throw Error("No otp record found");
		} 

		const { expiresAt } = matchedOTPRecord;
		if (expiresAt < Date.now()){
			await OTP.deleteOne({email});
			throw Error("Code has expired request for a new one");
		}

		const hashedOTP = matchedOTPRecord.otp;
		const validOTP = await verifyHashData(otp, hashedOTP);
		return validOTP;

	}catch(err) {
		throw err;
	}
};

const forgotPasswordOTP = async (email) => {
	try{

		const duration = 1;

		if (!(email)) {
			throw Error("email is empty");
		}

		await OTP.deleteOne({email});

		const generatedOTP = await generateOTP();

		console.log(generatedOTP);
		
		const mailOptions = {
			from : AUTH_EMAIL,
			to : email,
			subject : "Otp to reset password",
			html : `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${EMAIL_SENDER_NAME}</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Use the following OTP to reset your password. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${generatedOTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>${EMAIL_SENDER_NAME}</p>
    </div>
  </div>
</div>`
	}

	await sendEmail(mailOptions);

	const hashedOTP = await hashData(generatedOTP);
	const newOTP = new OTP({
		email,
		otp : hashedOTP,
		createdAt : Date.now(),
		expiresAt : Date.now() + 360000 * +duration
	});

	return await newOTP.save();

	}catch(err){
		throw err;
	}
};


const sendOTP = async (email) => {
	try{

		const duration = 1;

		if (!(email)) {
			throw Error("email is empty");
		}

		await OTP.deleteOne({email});

		const generatedOTP = await generateOTP();

		console.log(generatedOTP);
		
		const mailOptions = {
			from : AUTH_EMAIL,
			to : email,
			subject : "Otp for login",
			html : `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${EMAIL_SENDER_NAME}</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${generatedOTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>${EMAIL_SENDER_NAME}</p>
    </div>
  </div>
</div>`
	}

	await sendEmail(mailOptions);

	const hashedOTP = await hashData(generatedOTP);
	const newOTP = new OTP({
		email,
		otp : hashedOTP,
		createdAt : Date.now(),
		expiresAt : Date.now() + 360000 * + duration
	});

	return await newOTP.save();

	}catch(err){
		throw err;
	}
};

export { sendOTP, verifyOTP, deleteOTP, forgotPasswordOTP };