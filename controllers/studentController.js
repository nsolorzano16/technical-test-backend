const { response } = require('express');
const Student = require('../models/studentsModel');

const addStudent = async (req, res = response) => {
  try {
    const { email } = req.body;
    let student = await Student.findOne({ email });

    if (student) {
      return res.status(400).json({
        ok: false,
        msg: 'Student already exists',
      });
    }

    student = new Student(req.body);
    await student.save();

    return res.status(201).json({
      ok: true,
      student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Internal server error,contact your administrator',
    });
  }
};

const getStudents = async (req, res = response) => {
  try {
    const students = await Student.find().sort('-updatedAt');

    return res.status(200).json({
      ok: true,
      students,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Internal server error, contact your administrator',
    });
  }
};

const getStudent = async (req, res = response) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        ok: false,
        msg: 'Student not exists',
      });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Internal server error, contact your administrator',
    });
  }
};

const editStudent = async (req, res = response) => {
  try {
    const studentId = req.params.id;
    const student = Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        ok: false,
        msg: 'Student not exists',
      });
    }

    const newStudent = {
      ...req.body,
    };

    const updateStudent = await Student.findByIdAndUpdate(
      studentId,
      newStudent,
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      student: updateStudent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Internal server error, contact your administrator',
    });
  }
};

const deleteStudent = async (req, res = response) => {
  try {
    const studentId = req.params.id;
    const student = Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        ok: false,
        msg: 'Student not exists',
      });
    }

    await Student.findByIdAndDelete(studentId);

    return res.status(200).json({
      ok: true,
      msg: 'Student has been deleted',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Internal server error, contact your administrator',
    });
  }
};

module.exports = {
  addStudent,
  getStudents,
  editStudent,
  deleteStudent,
  getStudent,
};
