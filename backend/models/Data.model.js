const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    permanentAddress: {
      type: String,
      required: true,
      trim: true,
    },

    presentAddress: {
      type: String,
      required: true,
      trim: true,
    },

    interviewDate: {
      type: Date,
      default: null,
    },

    interviewLocation: {
      type: String,
      trim: true,
      default: null,
    },

    offerLetterDate: {
      type: Date,
      default: null,
    },

    firstSurveyMailDate: {
      type: Date,
      default: null,
    },

    secondSurveyMailDate: {
      type: Date,
      default: null,
    },

    joiningLetterDate: {
      type: Date,
      default: null,
    },

    joiningDate: {
      type: Date,
      default: null,
    },

    joiningLocation: {
      type: String,
      trim: true,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "APPLIED",
        "INTERVIEW_SCHEDULED",
        "OFFERED",
        "1ST_SURVEY_SENT",
        "2ND_SURVEY_SENT",
        "JOINING_LETTER_ACCEPTED",
        "JOINED",
        "REJECTED",
      ],
      default: "APPLIED",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Data", dataSchema);
