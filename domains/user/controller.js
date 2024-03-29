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
		console.log(err);
		throw Error(err);
	}

};

const createNewUser = async (data) => {
	try {
		const { name, email, password } = data;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw Error("User with this email already exists");
		}

		const hashedPassword = await hashData(password);
		const newUser = new User({
			name, email, password : hashedPassword, isVerified : false
		});

		await newUser.save();
		 
		return {
			  "status": "success",
			  "data": null,
			  "message": "Account Created"
			};

	}catch(err) {
		console.log(err);
		throw Error(err);
	}
};


const updatePassword = async (data) => {
	try {
		const { email, password } = data;

		const userData = await User.findOne({ email });

		if (!userData) {
			throw Error("No such user exists");
		}

		if (password.length < 6){
			throw Error("Password should be greater than 6 characters");
		}

		const hashedPassword = await hashData(password);

		await User.updateOne({email : email},
				{$set : {
					password : hashedPassword, 
				}
			});

		return {
		  "status": "success",
		  "data": null,
		  "message": "Password Changed"
		};

	}catch(err) {
		console.log(err);
		throw Error(err);
	}
};


const updateMockAttempt = async (data) => {
	try{

		const {userId, resoId, resoType} = data;

		const exists = await User.countDocuments({_id : userId,"attemptedMocks._id" : resoType})
		if (exists) {
			await User.updateOne({_id : userId}, 
				{ $addToSet : { "attemptedMocks.$[e1].list" : {_id : resoId } } },
				{arrayFilters : [{"e1._id" : resoType}]} )
		}else{
			await User.updateOne(
				{ _id : userId },
				{ $addToSet : {"attemptedMocks" : [{
						_id : resoType,
						list : { _id : resoId }
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
		console.log(err);
		throw Error(err);
	}
};

const updatePraticeData = async (data) => {
	try{

		const {userId, assetId, questionId} = data;

		const exists = await User.countDocuments({_id : userId,"practiceQuestions._id" : assetId})
		if (exists) {
			await User.updateOne({_id : userId}, 
				{ $addToSet : { "practiceQuestions.$[e1].list" : {_id : questionId } } },
				{arrayFilters : [{"e1._id" : assetId}]} )
		}else{
			await User.updateOne(
				{ _id : userId },
				{ $addToSet : {"practiceQuestions" : [{
						_id : assetId,
						list : { _id : questionId }
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
		console.log(err);
		throw Error(err);
	}
};

const updateQuestionAttemptData = async (data) => {
	try{

		const { userId, questionData, resoId, resoType}  = data;

	
		const exists = await User.countDocuments({_id : userId, "attemptedQuestions._id" : resoId})
		if (exists) {
			
			await User.updateOne({_id : userId}, 
				{ $set : { "attemptedQuestions.$[e1].queData" : questionData } },
				{arrayFilters : [{"e1._id" : resoId}]} )

		}else{
			
			await User.updateOne(
				{ _id : userId },
				{ $addToSet : {
					"attemptedQuestions" : [{
						_id : resoId,
						queData : questionData
					}]
				} },
			)
		}

		await updateMockAttempt({userId, resoId, resoType})
		
		return {
			 "status": "success",
			  "data": null,
			  "message": "updated"
			}

	}catch(err) {
		console.log(err);
		throw Error(err);
	}
};

export { createNewUser , authenticateUser, updatePraticeData, updateQuestionAttemptData, updatePassword  };