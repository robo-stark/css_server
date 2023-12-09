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
		return fetchedUser;
	}catch(err) {
		throw err;
	}

};

const createNewUser = async (data) => {
	try {
		const { email, password } = data;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw Error ("User with this email already exists");
		}

		const hashedPassword = await hashData(password);
		const newUser = new User({
			email, password : hashedPassword
		});

		const createdUser = await newUser.save();
		
		return createdUser;

	}catch(err) {
		throw err;
	}
};

export { createNewUser , authenticateUser };