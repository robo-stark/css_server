import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({


	email : {
		type : String,
		required : true
	},
	password : String,
	token : String,
	watchedVideos : [{ _id : {type : String} }],
	attemptedQuestions : [{ _id : {type : String} }]

});

export default mongoose.model("User", UserSchema);


	/*username : { 
		type : String,
		required : true,
		unique : true
	},*/