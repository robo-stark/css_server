import User from '../user/model.js'; 

const getHomeData = async() =>{
	try{
		const m = await import('../../json/home.json' , {
			assert: { type: 'json' }
		});
		return {
			  "status": "success",
			  "data": m.default,
			  "message": "Data Received"
			}
	}catch(err){
		throw Error(err);
	}
}

const getResource = async(data) => {
	try{

		const {type, subId} = data;

		const m = await import('../../json/'+type+'/'+subId+".json", {
			assert: { type: 'json' }
		});
		
		return {
			  "status": "success",
			  "data": m.default,
			  "message": "Data Received"
			}

	}catch(err){
		throw Error(err);
	}
}


const getPracticeQuestion = async(data) => {
	try{

		const {userId, type, subId} = data;

		let m = await import('../../json/pr/'+type+'/'+subId+".json", {
			assert: { type: 'json' }
		});
		m = m.default;

		const user = await User.findOne({_id : userId});
		const userData = user.attemptedQuestions.find((ele) => ele._id === subId );
		const queList = userData.list
		queList.forEach((ele) => {
			for (var i = 0; i < m.data.length; i++){
				if (m.data[i].questionId === ele._id) {
					m.data[i].attempted = true;
					break;
				}
			}
		})

		return {
			  "status": "success",
			  "data": m,
			  "message": "Data Received"
			}

	}catch(err){
		throw Error(err);
	}
}


const getCategory = async(catId) => {
	try{

		const m = await import('../../json/' + catId+".json", {
			assert: { type: 'json' }
		});
		
		return {
			  "status": "success",
			  "data": m.default,
			  "message": "Data Received"
			}

	}catch(err){
		throw Error(err);
	}
}
	
export { getHomeData, getResource, getCategory, getPracticeQuestion };


