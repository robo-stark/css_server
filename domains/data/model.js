import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
	id : String,
	type : String,
	count : Number,
	list : [{
		id: String,
     	category: String,
        count: Number,
        number:Number
	}]
});

const TestSchema = new Schema({
	testId : String,
	testCategory : String,
	testCount : Number,
	testList : [{
		testNumber : Number,
		testName : String,
		testTime : Number,
		testQuestions : Number,
		testData : [{
			questionId : String,
			question : String,
			option_a : String,
			option_b : String,
			option_c : String,
			option_d : String,
			solution : String,
			questionType : String,
			answer : Number,
			questionNumber : Number
		}]
	
	}]
});



const HomeSchema = new Schema({
	resourceId : String,
	resourceName: String,
	resourceCount: Number,
	resourceCategory : [{
		id : String,
		name : String
	}] 
});

const Home = mongoose.model("Home", HomeSchema);
//const Test = mongoose.model("Test", TestSchema);
const LR1 = mongoose.model("Lr1", ResourceSchema);
const LR2 = mongoose.model("Lr2", ResourceSchema);
const M2 = mongoose.model("M2", ResourceSchema);
const M1 = mongoose.model("M1", ResourceSchema);


export { Home, LR1, LR2, M1, M2 };