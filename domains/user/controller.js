import User from './model.js'; 
import { hashData, verifyHashData } from './../../util/hashData.js';
import createToken from './../../util/createToken.js';

const authenticateUser = async (data) => {

	try {
		const { email, password } = data;

		const fetchedUser = await User.findOne({ email });

		if (!fetchedUser) {
			throw Error("Invalid email entered");
		}

		const hashedPassword = fetchedUser.password;

		const passwordMatch = await verifyHashData(password, hashedPassword);
		if (!passwordMatch) {
			throw Error("Invlaid password");
		}

		const tokenData = { userId : fetchedUser._id, email};
		const token = await createToken(tokenData);
		fetchedUser.token = token;
		const res = {
			  "status": "success",
			  "data": fetchedUser,
			  "message": "Login Success"
			}
		return res;
	}catch(err) {
		throw Error(err);
	}

};

const createNewUser = async (data) => {
	try {
		const { email, password } = data;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw Error("User with this email already exists");
		}

		const hashedPassword = await hashData(password);
		const newUser = new User({
			email, password : hashedPassword
		});

		await newUser.save();
		 
		return {
			  "status": "success",
			  "data": null,
			  "message": "Account Created"
			};

	}catch(err) {
		throw Error(err);
	}
};


const updatePraticeData = async (data) => {
	try{

		const { userId, type, subId } = data;

		const exists = await User.countDocuments({_id : userId,"practiceQuestions._id" : type})
		if (exists) {
			await User.updateOne({_id : userId}, 
				{ $addToSet : { "practiceQuestions.$[e1].list" : {_id : subId } } },
				{arrayFilters : [{"e1._id" : type}]} )
		}else{
			await User.updateOne(
				{ _id : userId },
				{ $addToSet : {"practiceQuestions" : [{
						_id : type,
						list : { _id : subId }
					}]
				} },
			)
		}
		
		return {
			 "status": "success",
			  "data": null,
			  "message": "updated"
			}

	}catch(err) {
		throw Error(err);
	}
};

const updateQuestionAttemptData = async (data) => {
	try{

		const { userId, type, questionData } = data;

		const exists = await User.countDocuments({_id : userId, "attemptedQuestions._id" : type})
		if (exists) {
			
			await User.updateOne({_id : userId}, 
				{ $set : { "attemptedQuestions.$[e1].queData" : questionData } },
				{arrayFilters : [{"e1._id" : type}]} )

		}else{
			
			await User.updateOne(
				{ _id : userId },
				{ $addToSet : {
					"attemptedQuestions" : [{
						_id : type,
						queData : questionData
					}]
				} },
			)
		}
		
		return {
			 "status": "success",
			  "data": null,
			  "message": "updated"
			}

	}catch(err) {
		throw Error(err);
	}
};

export { createNewUser , authenticateUser, updatePraticeData, updateQuestionAttemptData };