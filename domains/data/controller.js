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
		
		return m.default;

	}catch(err){
		throw Error("Failed to fetch resource");
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
		const userData = user.practiceQuestions.find((ele) => ele._id === subId );
		if (userData != null){

			const queList = userData.list
			queList.forEach((ele) => {
				for (var i = 0; i < m.data.length; i++){
					if (m.data[i].questionId === ele._id) {
						m.data[i].attempted = true;
						break;
					}
				}
			})
			return m;

		}else { return m; }

	}catch(err){
		throw Error(err);
	}
}


const getMockQuestion = async(data) => {
	try{

		const { userId, type, subId, dataType } = data;

		let m = await import('../../json/mr/'+type+'/'+subId+".json", {
			assert: { type: 'json' }
		});
		m = m.default;

		if (dataType == "new") { return m; }
		else {

			// make a report here why it went wrong ->
			const user = await User.findOne({_id : userId});
			const userData = user.attemptedQuestions.find((ele) => ele._id === subId );

			const queVarc = userData.queData.que_varc
			const queLrdi = userData.queData.que_lrdi
			const queQuants = userData.queData.que_quants

			
			const varcQList = m.que_varc[0].question_data;
			const lrdiQList = m.que_lrdi[0].question_data;
			const quantsQList = m.que_quants[0].question_data;
		
			if ( varcQList.length != queVarc.length ) {
				throw Error("Question Data Error")
			}else{
				for (var i = 0; i < queVarc.length; i++){
					if ( varcQList[i].questionId === queVarc[i]._id ){
						varcQList[i].user_answer = queVarc[i].user_answer
					}else{
						throw Error("Error Fetching data");
					}
				}
			}

			if ( lrdiQList.length != queLrdi.length ) {
				throw Error("Question Data Error")
			}else{
				for (var i = 0; i < queLrdi.length; i++){
					if ( lrdiQList[i].questionId === queLrdi[i]._id ){
						lrdiQList[i].user_answer = queLrdi[i].user_answer
					}else{
						throw Error("Error Fetching data");
					}
				}
			}

			if ( quantsQList.length != queQuants.length ) {
				throw Error("Question Data Error")
			}else{
				for (var i = 0; i < queQuants.length; i++){
					if ( quantsQList[i].questionId === queQuants[i]._id ){
						quantsQList[i].user_answer = queQuants[i].user_answer
					}else{
						throw Error("Error Fetching data");
					}
				}
			}

			return m;
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
	
export { getHomeData, getResource, getCategory, getPracticeQuestion, getMockQuestion};


