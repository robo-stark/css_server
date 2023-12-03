const generateOTP = async () => {
	try {
		return `${Math.floor(1000 + Math.random() * 9000)}`;
	}catch(err) {
		throw err;
	}
}

export default generateOTP;