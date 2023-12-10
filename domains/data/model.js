import mongoose from "mongoose";

const Schema = mongoose.Schema;

const lrSchema = new mongoose.Schema({
      id: { type: String },
      category: { type: String },
      teacher: { type: String },
      finished: Number,
      sno: Number,
      count: Number,
      list: [{
        id: {
          type : String
          },
        sno: Number,
        name: { type: String },
        link: { type: String },
        type: { type: String },
        watched: Boolean
     }]
});


const questionSchema = new mongoose.Schema({
      id: { type: String },
      category: { type: String },
      createdAt: Date,
      isLocked: Boolean,
      attempted: Boolean,
      sno: Number,
      questions: Number,
      time: Number,
      questionData: [{
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
});

const TempSchema = new Schema({
	id : String,
	category : String,
	data : [lrSchema]
});

const queSchema = new Schema({
  id : String,
  category : String,
  data : [questionSchema]
});


const HomeSchema = new Schema({
	resourceId : String,
	resourceName: String,
	resourceData : [
    {
      id : { type : String },
      name : { type : String },
      list : [
        {
        id: { type : String },
        category: { type : String },
        sno:Number
      }]
    }]
});

//const M2 = mongoose.model("M2", TempSchema);
//const M1 = mongoose.model("M1", TempSchema);
//const P1 = mongoose.model("P1", queSchema);
//const L1 = mongoose.model("L1", TempSchema);
//const LR2 = mongoose.model("LR2", TempSchema);
//const HomeModel = mongoose.model("Resource", HomeSchema);


//export { HomeModel, L1};