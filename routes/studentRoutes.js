const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();
const {
  addStudent,
  editStudent,
  deleteStudent,
  getStudents,
} = require('../controllers/studentController');
const { isDate } = require('../helpers/isDate');

/**
 * Routes
 * api/students/
 */

router.post(
  '/add',
  [
    check('firstName', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('dob', 'DOB is required').custom(isDate),
    validateFields,
  ],
  addStudent
);

router.get('/', getStudents);

router.put(
  '/edit/:id',
  [
    check('firstName', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('dob', 'DOB is required').custom(isDate),

    validateFields,
  ],
  editStudent
);

router.delete('/delete/:id', deleteStudent);

module.exports = router;
