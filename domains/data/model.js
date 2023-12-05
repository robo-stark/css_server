import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

const MockSchema = new Schema({
	mockId : String,
	mockType : String,
	mockCount : Number,
	mockList : [{
		testId : String,
		testCategory : String,
		testCount : String,
	}]

});

const HomeSchema = new Schema({
	resourceId : {
		type : String,
		required : true,
		unique : true
	},
	resourceName : {
		type : String,
		required : true
	},
	resourceCount : {
		type : Number,
		required : true
	},
	resourceCategory : [{
		id : String,
		name : String
	}] 
});

const Home = mongoose.model("Home", HomeSchema);
const Mock = mongoose.model("Mock", MockSchema);
const Test = mongoose.model("Test", TestSchema);

export { Home, Mock, Test };