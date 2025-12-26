const Data = require("../models/Data.model");

exports.addData = async (req, res) => {
  try {
    const {
      fullName,
      permanentAddress,
      presentAddress,
      interviewDate,
      interviewLocation,
      offerLetterDate,
      firstSurveyMailDate,
      secondSurveyMailDate,
      joiningLetterDate,
      joiningDate,
      joiningLocation,
      status,
    } = req.body;

    if (
      !fullName ||
      !permanentAddress ||
      !presentAddress ||
      !interviewDate ||
      !interviewLocation ||
      !offerLetterDate ||
      !firstSurveyMailDate ||
      !secondSurveyMailDate ||
      !joiningLetterDate ||
      !joiningDate ||
      !joiningLocation
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Full name, permanent address and present address are required",
      });
    }

    const existingCandidateData = await Data.findOne({ fullName });

    if (existingCandidateData) {
      return res.status(409).json({
        success: false,
        message: "Candidate already exists with this full name.",
      });
    }

    const newData = await Data.create({
      fullName,
      permanentAddress,
      presentAddress,
      interviewDate,
      interviewLocation,
      offerLetterDate,
      firstSurveyMailDate,
      secondSurveyMailDate,
      joiningLetterDate,
      joiningDate,
      joiningLocation,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Data added successfully",
      data: newData,
    });
  } catch (error) {
    console.error("Error while adding data:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

exports.getData = async (req, res) => {
  try {
    const data = await Data.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error while fetching data:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Data ID is required",
      });
    }

    //* Prevent empty body update
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
      });
    }

    const updatedData = await Data.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true, //* schema validation
      }
    );

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error while updating data:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

exports.getSingleData = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Data ID is required",
      });
    }

    const data = await Data.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error while fetching single data:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};
