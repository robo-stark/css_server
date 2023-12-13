import mongoose from "mongoose";
const Schema = mongoose.Schema;


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


//export { HomeModel, L1};