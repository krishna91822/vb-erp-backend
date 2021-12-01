const express = require('express');

const employeeController = require('./../controllers/employeeController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(authController.protect, employeeController.getAllEmployees) //Get all employee documents
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    employeeController.createEmployee
  ); //Create Employee (FOR ADMIN)

router
  .route('/:id')
  .get(authController.protect, employeeController.getEmployee) //Get Employee details (FOR READ ONLY)
  .patch(authController.protect, employeeController.updateEmployee) //Update Employee details
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    employeeController.deleteEmployee
  ); //delete Employee documents

module.exports = router;
