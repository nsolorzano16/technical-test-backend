const { Schema, model } = require('mongoose');

const StudentSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
});

StudentSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Student', StudentSchema);
