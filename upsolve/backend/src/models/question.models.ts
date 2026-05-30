// models/question.models.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionId: {
      type: Number,
      required: true,
      unique: true,
    },
    frontendId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    titleSlug: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    paidOnly: {
      type: Boolean,
      default: false,
    },
    totalAccepted: {
      type: Number,
      default: 0,
    },
    totalSubmitted: {
      type: Number,
      default: 0,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
