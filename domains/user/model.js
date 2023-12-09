import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({


	email : {
		type : String,
		required : true
	},
	password : String,
	token : String

});

export default mongoose.model("User", UserSchema);


	/*username : { 
		type : String,
		required : true,
		unique : true
	},*/