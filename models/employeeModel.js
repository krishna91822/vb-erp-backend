const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validator = require('validator');
const bcrypt = require('bcryptjs');

const otherField = new mongoose.Schema({
  fieldName: {
    type: String,
    trim: true,
  },
  fieldValue: {
    type: String,
    trim: true,
  },
  fieldType: {
    type: String,
    trim: true,
  },
});

const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: Number,
      unique: true,
      // required: true,
    },
    empName: {
      type: String,
      required: [true, 'A employee must have a name'],
      trim: true,
      maxlength: [30, 'A employee name must be less or equal to 30 characters'],
      lowercase: true,
    },
    empEmail: {
      type: String,
      required: [true, 'Please provide your email'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    empDoj: {
      type: Date,
      required: [true, 'A employee must have a date of joining'],
    },
    empDob: {
      type: Date,
      required: [true, 'A employee must have a date of birth'],
    },
    empPhoto: {
      type: String,
      trim: true,
    },
    empDepartment: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    empDesignation: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    empReportingManager: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    empConnections: {
      type: Number,
      lowercase: true,
      trim: true,
      default: 0,
    },
    empHobbies: {
      type: Array,
      lowercase: true,
      trim: true,
      default: [],
    },
    empAboutMe: {
      type: String,
      lowercase: true,
      trim: true,
      default: 'Something about me.',
    },
    empCurrentAddress: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    empResidentialAddress: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    empBand: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    empGraduation: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    empGraduationUniversity: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    empPostGraduation: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    empPostGraduationUniversity: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    empPrimaryCapability: {
      type: Array,
      lowercase: true,
      trim: true,
      default: [],
    },
    empSkillSet: {
      type: Array,
      lowercase: true,
      trim: true,
      default: [],
    },
    empCertifications: {
      type: Array,
      lowercase: true,
      trim: true,
      default: [],
    },
    role: {
      type: String,
      lowercase: true,
      enum: {
        values: ['admin', 'employee', 'aprover'],
        message: 'role must be admin, employee and aprover only!',
      },
      default: 'employee',
    },
    personalDetails: {
      type: [otherField],
      default: undefined,
    },
    professionalDetails: {
      type: [otherField],
      default: undefined,
    },
    skillsDetails: {
      type: [otherField],
      default: undefined,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 5,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        //this will only work on Create and save!!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password are not same!',
      },
    },
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

employeeSchema.plugin(AutoIncrement, { inc_field: 'empId' });

employeeSchema.pre('save', async function (next) {
  //only run this if password was actually modified..  its simply check if field is created or modified
  if (!this.isModified('password')) return next();

  //hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

//instance methods is a methods that is available on all the documents of the certain collections
employeeSchema.methods.correctPassword = async function (
  candidatePassword,
  employeePassword
) {
  //here (this) will not work becoz password select is false so have to pass the password as variable
  return await bcrypt.compare(candidatePassword, employeePassword);
};

employeeSchema.methods.changedPasswordAfterToken = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

//Employee model class
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
