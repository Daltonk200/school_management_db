// controllers/courseController.js
const mongoose = require("mongoose");

const coursesModel = mongoose.model("Courses");


const createCourse = async (req, res) => {
  const { title, description } = req.body;
  const existingtitle = await coursesModel.findOne({ title: title });
  try {
    if (existingtitle) throw "The course already exist";
  } catch (error) {
    res.status(400).json({
      message: error,
    });
    return;
  }

  try {
    const course =  await coursesModel.create({
      title: title,
      description: description,
    });


    res.status(201).json({
      message: "Course successfully created",
      course: course,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateCourse = async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = await coursesModel.findByIdAndUpdate(
      req.params.id,
      { title:title, description:description },
      { new: true }
    );
    if (!course) throw "Course not found";
    res.json({ message: "course successfully Updated!", course: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await coursesModel.findByIdAndDelete(req.params.id);
    if (!course) throw "Course not found";
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await coursesModel.find({});
    res.json({ courses: courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCourse, updateCourse, deleteCourse, getCourses };
