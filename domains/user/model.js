import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({

	email : {
		type : String,
		required : true
	},
	password : String,
	isVerified : Boolean,
	token : String,
	attemptedQuestions : [{ 
			_id : {type : String} ,
			queData : {
				que_varc : [{_id : {type : String}, user_answer : { type : Number} }],
				que_lrdi : [{_id : {type : String}, user_answer : { type : Number} }],
				que_quants : [{_id : {type : String}, user_answer : { type : Number} }]
			}
			
		}],
	practiceQuestions : [{ 
			_id : {type : String} ,
			list : [ {_id : {type : String} }]
		}],
	attemptedMocks : [{ 
			_id : {type : String} ,
			list : [ {_id : {type : String} }]
		}]
});

export default mongoose.model("User", UserSchema);