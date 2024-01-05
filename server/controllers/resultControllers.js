const AsyncHandler = require("express-async-handler");
const Test = require("../database/models/testModel");
const Result = require("../database/models/resultModel");

const getAllResults = AsyncHandler(async (req, res) => {
  try {
    const results = await Result.find({ test: req.params.id });
    if (!results) {
      res.status(400);
      throw new Error("No Results Found");
    }
    res.status(200).json({
      status: "success",
      count: results.length,
      data: {
        results,
      },
    });
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});
const getResult = AsyncHandler(async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result || result.student != req.user.id) {
      res.status(404);
      throw new Error("Result not found");
    }
    res.status(200).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});
const getResults = AsyncHandler(async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id });
    if (!results) {
      res.status(404);
      throw new Error("Results not found");
    }
    res.status(200).json({
      status: "success",
      count: results.length,
      data: {
        results,
      },
    });
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});
const createResult = AsyncHandler(async (req, res) => {
  try {
    const { answers } = req.body;
    const test = await Test.findById(req.params.id);
    if (!test) {
      req.status(400);
      throw new Error("cannot find test");
    }

    //SCORE CALCULATION
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === test.questions[index].correctAnswer) score++;
    });
    const percentage = (score / test.totalMarks) * 100;

    const filter = { student: req.user._id, test: req.params.id };
    const update = { total: test.totalMarks, scored: score, percentage };
    const result = await Result.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});
const deleteTestResults = AsyncHandler(async (req, res) => {
  try {
    const results = await Result.deleteMany({ test: req.params.id });
    if (!results) {
      res.status(404);
      throw new Error("Results not found");
    }
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});
module.exports = {
  getAllResults,
  getResult,
  createResult,
  getResults,
  deleteTestResults,
};
