
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

const getLearningResource = async(subId) => {
	try{

		const m = await import('../../json/lr/' + subId+".json", {
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
	
export { getHomeData, getLearningResource, getCategory};


