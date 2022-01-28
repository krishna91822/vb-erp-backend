const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { addUserSchema, loginSchema } = require("../schema/userSchema");
const { customResponse, customPagination } = require("../utility/helper");
const rolesModal = require("../models/rolesSchema");
const userModel = require("../models/user");
const { sendEmail, generateMessage } = require("../utility/AutogenerateEmail");
const getUserList = async (req, res) => {
  /* 	#swagger.tags = ['User']
      #swagger.description = 'Get users list' 
      #swagger.parameters['page'] = {
        in: 'query',
        type: 'integer',
        description: 'Page number' 
      }
      #swagger.parameters['limit'] = {
        in: 'query',
        type: 'integer',
        description: 'Data limit per page' 
      }
      #swagger.responses[200] = {
        schema:{
          "status": "success",
          "code": 200,
          "message": "",
          "data": {
            "pageCount": 1,
            "totalCount": 1,
            "currentPage": 1,
            "results": [
              {
                "_id": "610d090636ba149966bd3b55",
                "first_name": "Jhon",
                "last_name": "Doe",
                "email": "jhon@valuebound.com",
                "role": "admin"
              }
            ]
          },
          "error": {}
        }
      }
  */
  let code, message;
  const searchString = [{ role: { $regex: "" } }];

  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 15;
  if (req.query.first_name) {
    searchString.push({ first_name: { $regex: req.query.first_name } });
  }
  if (req.query.last_name) {
    searchString.push({ last_name: req.query.last_name });
  }
  if (req.query.email) {
    searchString.push({ email: req.query.email });
  }
  try {
    code = 200;
    const users = await userModel.find({
      $and: [{ $and: searchString }],
    });
    const data = customPagination({ data: users, page, limit });
    const resData = customResponse({ code, data });
    return res.status(code).send(resData);
  } catch (error) {
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

const getUserDeatil = async (req, res) => {
  /* 	#swagger.tags = ['User']
      #swagger.description = 'Get users Detail' 
      #swagger.responses[200] = {
        schema:{
          "status": "success",
          "code": 200,
          "message": "",
          "data":  {
            "_id": "610bc1b31b82a66f6bcd64ea",
            "first_name": "akash",
            "last_name": "kumar",
            "email": "akash@gmail.com",
            "role": "admin",
            "__v": 0
          },
          "error": {}
        }
      }
  */
  let code, message;
  const _id = req.params.id;
  try {
    code = 200;
    const data = await userModel.findById({ _id });
    const resData = customResponse({ code, data });
    return res.status(code).send(resData);
  } catch (error) {
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

const addUser = async (req, res) => {
  /* 	#swagger.tags = ['User']
      #swagger.description = 'Add new user'
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            $first_name: 'Jhon',
            $last_name: 'Doe',
            $email: 'jhon@valuebound.com',
            $role: 'admin'
        }
      }
      #swagger.responses[201] = {
        description: 'User successfully added.',
        schema: { 
          "status": "success",
          "code": 201,
          "message": "",
          "data": {
            "first_name": 'Jhon',
            "last_name": 'Doe',
            "email": 'jhon@valuebound.com',
            "role": 'admin', 
          },
          "error": {}
        }
      }
  */
  let code, message;
  const { error } = addUserSchema.validate(req.body);
  if (error) {
    code = 422;
    message = "Invalid request data";
    const resData = customResponse({
      code,
      message,
      err: error && error.details,
    });
    return res.status(code).send(resData);
  }
  try {
    code = 201;
    const firstname = req.body.first_name.split(" ")[0];
    const lastname = req.body.first_name.split(" ")[1];
    req.body.first_name = firstname;
    req.body.last_name = lastname;
    const data = new userModel(req.body);
    await data.save();
    // const emailMessage = generateMessage(data._id, data.first_name);
    // sendEmail(data.email, `Vb ERP Account Created`, emailMessage);
    // console.log(emailMessage);
    const resData = customResponse({
      code,
      data,
    });
    return res.status(code).send(resData);
  } catch (error) {
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

const updateUser = async (req, res) => {
  /* 	#swagger.tags = ['User']
      #swagger.description = 'Update user' 
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            $first_name: 'Jhon',
            $last_name: 'Doe',
            $email: 'jhon@valuebound.com',
            $role: 'admin'
        }
      }
      #swagger.responses[200] = {
        description: 'User successfully updated.',
        schema: { 
          "status": "success",
          "code": 200,
          "message": "",
          "data": {
            "first_name": 'Jhon',
            "last_name": 'Doe',
            "email": 'jhon@valuebound.com',
            "role": 'admin'
          },
          "error": {}
        }
      }
  */
  let code, message;
  const _id = req.params.id;
  try {
    code = 200;
    message = "user successfully updated!";
    const user = await userModel.findOneAndUpdate(
      { _id },
      { ...req.body },
      { new: true }
    );
    await user.save();
    const resData = customResponse({
      code,
      data: user,
      message,
    });
    return res.status(code).send(resData);
  } catch (error) {
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};

const deleteUser = async (req, res) => {
  /* 	#swagger.tags = ['User']
      #swagger.description = 'Delete user' 
      #swagger.responses[200] = {
      schema:{
        "status": "success",
        "code": 200,
        "message": "User deleted successfully",
        "data":  {
          "_id": "610bc1b31b82a66f6bcd64ea",
          "first_name": 'Jhon',
          "last_name": 'Doe',
          "email": 'jhon@valuebound.com',
          "role": 'admin',
          "__v": 0
        },
        "error": {}
      }
    }
  */
  let code, message;
  const _id = req.params.id;
  const isValid = mongoose.Types.ObjectId.isValid(_id);
  if (!isValid) {
    code = 422;
    message = "Invalid objectId id";
    const resData = customResponse({ code, message });
    return res.status(code).send(resData);
  }
  try {
    code = 200;
    const user = await userModel.findByIdAndDelete({ _id });
    message = "user successfully deleted!";
    const resData = customResponse({
      code,
      data: user,
      message,
    });
    return res.status(code).send(resData);
  } catch (error) {
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};
const auth = async (req, res) => {
  /* 	#swagger.tags = ['User']
      #swagger.description = 'Add new user'
      #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            $first_name: 'Jhon',
            $last_name: 'Doe',
            $email: 'jhon@valuebound.com',
            $role: 'admin'
        }
      }
      #swagger.responses[201] = {
        description: 'User successfully added.',
        schema: { 
          "status": "success",
          "code": 201,
          "message": "",
          "data": { 
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSmhvbiBEb2UiLCJpYXQiOjE2Mjg0OTQ5NzksImV4cCI6MTYyODY2Nzc3OSwiaXNzIjoidmItY21zIn0.wdyX_wXWABr1BIw_7FzZKgowhixX8EXVN4ZojvzsaIU",
          },
          "error": {}
        }
      }
  */
  let code, message, data;
  const { error } = loginSchema.validate(req.body);

  if (error) {
    code = 422;
    message = "Invalid request data";
    const resData = customResponse({
      code,
      message,
      err: error && error.details,
    });
    return res.status(code).send(resData);
  }
  try {
    code = 200;
    let payload = { ...req.body };
    const options = {
      expiresIn: process.env.EXPIRESIN,
      issuer: process.env.ISSUER,
    };
    const secret = process.env.JWT_SECRET;
    const user = await userModel.findOne({ email: req.body.email }).exec();
    const userRole = user.role;
    let rolesData;
    let permissions = [];
    let userPermission;
    const userDetail = {};
    await Promise.all(
      user.role.map(async (role) => {
        rolesData = await rolesModal
          .find({ label: role })
          .then(function (rolesData) {
            userPermission = rolesData[0].permissions;
            permissions.push(...userPermission);
          });
      })
    );
    payload = {
      ...payload,
      permissions: [...new Set(permissions)],
      roles: userRole,
    };
    const token = jwt.sign(payload, secret, options);
    const reqBody = { token, ...req.body };
    if (!user) {
      code = 404;
      message = "Invalid request data";
      const resData = customResponse({
        code,
        message,
      });
      return res.status(code).send(resData);
    } else {
      const userEntry = await userModel.findOne({ email: req.body.email });
      const doesPasswordMatch = await bcrypt.compare(
        req.body.password,
        userEntry.password
      );
      if (doesPasswordMatch) {
        code = 200;
        data = await userModel.findOneAndUpdate(
          { email: req.body.email },
          { ...reqBody },
          { new: true }
        );
        await data.save();
        userDetail.name = data.first_name;
        userDetail.email = data.email;
        userDetail.roles = data.role;
        userDetail.permissions = [...new Set(permissions)];
        userDetail.token = "Bearer " + data.token;
        userDetail.id = data._id.toString();
      } else {
        code = 422;
        message = "Invalid request data";
        data = customResponse({
          code,
          message,
        });
        return res.status(code).send(data);
      }
    }
    const resData = customResponse({ code, data: userDetail });
    return res.status(code).send(resData);
  } catch (error) {
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};
const getAccount = async (req, res) => {
  /* 	#swagger.tags = ['User']
      #swagger.description = 'Get Account'
      #swagger.responses[201] = {
        description: 'User successfully added.',
        schema: { 
          "status": "success",
          "code": 200,
          "message": "",
          "data": { 
            "first_name": 'Jhon',
            "last_name": 'Doe',
            "email": 'jhon@valuebound.com',
            "role": 'admin', 
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSmhvbiBEb2UiLCJpYXQiOjE2Mjg0OTQ5NzksImV4cCI6MTYyODY2Nzc3OSwiaXNzIjoidmItY21zIn0.wdyX_wXWABr1BIw_7FzZKgowhixX8EXVN4ZojvzsaIU",
          },
          "error": {}
        }
      }
  */
  let code, message, data;
  const authorizationHeaader = req.headers.authorization.split(" ")[1];
  try {
    code = 200;
    const user = await userModel
      .findOne({ token: authorizationHeaader })
      .exec();
    const resData = customResponse({ code, data: user });
    return res.status(code).send(resData);
  } catch (error) {
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};
const validateToken = async (req, res) => {
  /* 	#swagger.tags = ['User']
      #swagger.description = 'Get Account'
      #swagger.responses[201] = {
        description: 'User successfully added.',
        schema: { 
          "status": "success",
          "code": 200,
          "message": "",
          "data": { 
            "first_name": 'Jhon',
            "last_name": 'Doe',
            "email": 'jhon@valuebound.com',
            "role": 'admin', 
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSmhvbiBEb2UiLCJpYXQiOjE2Mjg0OTQ5NzksImV4cCI6MTYyODY2Nzc3OSwiaXNzIjoidmItY21zIn0.wdyX_wXWABr1BIw_7FzZKgowhixX8EXVN4ZojvzsaIU",
          },
          "error": {}
        }
      }
  */
  let code,
    message,
    data = {};
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const secret = process.env.JWT_SECRET;
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const options = {
      expiresIn: process.env.EXPIRESIN,
      issuer: process.env.ISSUER,
    };
    try {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          code = 401;
          message = err.message;
          const resData = customResponse({
            code,
            message,
            err,
          });
          return res.status(code).send(resData);
        }
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        const user = userModel
          .findOne({ email: result.email })
          .exec()
          .then((user) => {
            id = user._id;
            data.name = user.first_name;
            data.email = user.email;
            data.roles = user.role;
            data.permissions = result.permissions;
            data.token = user.token;
            data.id = id.toString();
            code = 200;
            message = "Valid Token";
            const resData = customResponse({ code, message, data });
            return res.status(code).send(resData);
          });
      });
    } catch (error) {
      code = 401;
      message = "Invalid Token";
      const resData = customResponse({
        code,
        message,
        err: error,
      });
      return res.status(code).send(resData);
    }
  } else {
    code = 401;
    message = "Authentication error. Token required.";
    const resData = customResponse({ code, message });
    return res.status(code).send(resData);
  }
};

const logout = async (req, res) => {
  /* 	#swagger.tags = ['User']
      #swagger.description = 'Get Account'
      #swagger.responses[200] = {
        description: 'User successfully added.',
        schema: {
            "status": "success",
            "code": 200,
            "data": {
              "name": "Rahul",
              "email": "rahul@valuebound.com",
              "roles": [],
              "permissions": [],
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVsQHZhbHVlYm91bmQuY29tIiwicGFzc3dvcmQiOiJxd2VydHkxMjMiLCJwZXJtaXNzaW9ucyI6WyJ2aWV3X2VtcGxveWVlX2Rhc2hib2FyZCIsImVkaXRfZW1wbG95ZWVfZGFzaGJvYXJkIiwiY3JlYXRlX2VtcGxveWVlX2Rhc2hib2FyZCIsImRvd25sb2FkX2VtcGxveWVlX3Byb2ZpbGUiLCJzZWFyY2hfZW1wbG95ZWUiLCJhcHByb3ZlX2VtcGxveWVlX2VkaXRfcmVxdWVzdCIsInZpZXdfQ0lNU19tb2R1bGUiLCJ1cGRhdGVfb25fQ0lNU19tb2R1bGUiLCJjcmVhdGVfQ0lNU19tb2R1bGUiLCJ2aWV3X1BNT19tb2R1bGUiLCJjcmVhdGVfcHJvamVjdF9pbl9QTU8iLCJ1cGRhdGVfcHJvamVjdF9pbl9QTU8iLCJ2aWV3X2JlbmNoX3N0cmVuZ3RoIiwicHJvamVjdF9pbmZvcm1hdGlvbl90YWJsZSIsInZpZXdfQ01TIiwidXBsb2FkX1BPL1NPVy9jb250cmFjdCIsInZpZXdfaW52b2ljZSIsInVwbG9hZF9pbnZvaWNlIiwicmVjaWV2ZV9zbGFja19ub3RpZmljYXRpb24iLCJhd2FyZF9ub21pbmF0aW9uIiwibXlfcmV3YXJkcyIsInJld2FyZHNfaGlzdG9yeSJdLCJyb2xlcyI6WyJzdXBlcl9hZG1pbiJdLCJpYXQiOjE2NDI0NDI3MTYsImV4cCI6MTY0MjYxNTUxNiwiaXNzIjoidmItZXJwIn0.TYQ9FqruI4YviiUtI6ZjowUmh9ZGxsq8TTk1bnQtD5w"
            },
            "message": "Valid Token",
            "error": {}
          },
          "error": {}
        }
      }
  */
  try {
    let code, message;
    await userModel
      .findOneAndUpdate(
        { email: req.decoded.email },
        { token: " " },
        { new: true }
      )
      .then(() => {
        code = 200;
        message = "User successfully Logout";
        const resData = customResponse({ code, message });
        return res.status(code).send(resData);
      });
  } catch (error) {
    code = 500;
    message = "Internal Server Error";
    const resData = customResponse({ code, message, error });
    res.status(code).send(resData);
  }
};

const setPassword = async (req, res) => {
  let code, message;
  const _id = req.params.id;
  const password = req.body.password;
  try {
    code = 200;
    message = "user successfully updated!";
    const user = await userModel.findOneAndUpdate(
      { _id },
      { password: password },
      { new: true }
    );
    if (!user) {
      code = 400;
      message = "Bad Request";
      const resdata = customResponse({ code, message });
      return res.status(code).send(resdata);
    }
    await user.save();
    const resData = customResponse({
      code,
      data: user,
      message,
    });
    return res.status(code).send(resData);
  } catch (error) {
    code = 500;
    message = "Internal server error";
    const resData = customResponse({
      code,
      message,
      err: error,
    });
    return res.status(code).send(resData);
  }
};
module.exports = {
  getUserList,
  getUserDeatil,
  addUser,
  updateUser,
  deleteUser,
  auth,
  getAccount,
  validateToken,
  logout,
  setPassword,
};
