import User from '../user/model.js'; 

const getHomeData = async() =>{
	try{
		const m = await import('../../json/home.json' , {
			assert: { type: 'json' }
		});
		return m.default;
	}catch(err){
		console.log(err);
		throw Error("Not Found");
	}
}


const getResource = async(resoId) => {
	try{

		const m = await import('../../json/reso/' + resoId+".json", {
			assert: { type: 'json' }
		});
		
		return m.default;
			  

	}catch(err){
		console.log(err);
		throw Error("Not Found");
	}
}
	

const getAsset = async(data) => {
	try{

		const {resoType, resoId} = data;

		const m = await import('../../json/'+resoType+'/asset/'+resoId+".json", {
			assert: { type: 'json' }
		});
		
		return m.default;

	}catch(err){
		console.log(err);
		throw Error("Not Found");
	}
}

const getLearningResource = async(data) => {
	try{

		const {userId, assetType, assetId} = data;

		let m = await import('../../json/lr/'+assetType+'/' + assetId+".json", {
			assert: { type: 'json' }
		});
		
		return m.default;
			  

	}catch(err){
		console.log(err);
		throw Error("Not Found");
	}
}


const getPracticeResource = async(data) => {
	try{

		const {userId, assetType, assetId} = data;

		let m = await import('../../json/pr/'+assetType+'/' + assetId+".json", {
			assert: { type: 'json' }
		});

		m = m.default;

		const user = await User.findOne({_id : userId});
		const userData = user.practiceQuestions.find((ele) => ele._id === assetId );
		if (userData != null){

			const queList = userData.list
			
			queList.forEach((ele) => {
				for (var i = 0; i < m.asset_data.length; i++){
					if (m.asset_data[i].questionId === ele._id) {
						m.asset_data[i].attempted = true;
						break;
					}
				}
			})
			return m;

		}else { return m; }

	}catch(err){
		console.log(err);
		throw Error("Not Found");
	}
}


const getMockResource = async(data) => {
	try{

		const {userId, assetType, assetId, dataType} = data;

		let m = await import('../../json/mr/'+assetType+'/' + assetId+".json", {
			assert: { type: 'json' }
		});

		m = m.default;
		
		if (dataType === "new") { return m; }
		
		else if (dataType === "attempt") {
     
	      // make a report here why it went wrong ->
	      const user = await User.findOne({_id : userId});
	      const userData = user.attemptedQuestions.find((ele) => ele._id === assetId );

	     	if (userData != null) {

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
        
      		} else { throw Error("Attempt Not Available") }

    	}
    	else { throw Error("Not Found") }

	}catch(err){
		throw err;
	}
}


export { getHomeData, getResource, getAsset, getLearningResource, getPracticeResource, getMockResource};


