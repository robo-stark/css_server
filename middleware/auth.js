import jwt from 'jsonwebtoken';

const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send("An Authentication token required");
	}

	try {
		const decodedToken = await jwt.verify(token, TOKEN_KEY);
		req.currentUser = decodedToken;
	} catch(err) {
		return res.status(401).send("Inavlid Token provided");
	}

	return next();

};

export default verifyToken;