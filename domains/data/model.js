import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new mongoose.Schema({
      id: { type: String },
      category: { type: String },
      count: Number,
      list: [{
        number: Number,
        name: { type: String },
        link: { type: String },
        type: { type: String },
        time: Number,
        questions: Number,
        data: [{ 
          questionNumber: Number,
          questionId: { type: String },
          question: { type: String },
          option_a: { type: String },
          option_b: { type: String },
          option_c: { type: String },
          option_d: { type: String },
          answer: Number,
          solution: { type: String },
          questionType: { type: String }
        }]
     }]
});

const TempSchema = new Schema({
	id : String,
	name : String,
	data : [questionSchema]
});

const ResourceSchema = new Schema({
	id : { type : String },
	type : { type : String },
	count : Number,
	list : [{
		id: { type : String },
     	category: { type : String },
        count: Number,
        number:Number
	}]
});


const HomeSchema = new Schema({
	resourceId : String,
	resourceName: String,
	resourceData : [ResourceSchema]
});

const M2 = mongoose.model("M2", TempSchema);
const M1 = mongoose.model("M1", TempSchema);
const LR1 = mongoose.model("LR1", TempSchema);
const LR2 = mongoose.model("LR2", TempSchema);
const HomeModel = mongoose.model("Resource", HomeSchema);


export { HomeModel, M1, M2, LR1, LR2};