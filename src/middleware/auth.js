const jwt = require("jsonwebtoken");

const { customResponse } = require("../utility/helper");

const isAuthorized = async (req, res, next) => {
  if (process.env.NODE_ENV == "test") {
    next();
    return;
  }
  let code, message;
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
        req.decoded = result;
        next();
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

const hasPermission = (permission) => {
  return async (req, res, next) => {
    try {
      let code, message;
      let hasRole = false;
      req.decoded.roles.map((role) => {
        permission.includes(role) && (hasRole = true);
      });
      if (hasRole) {
        next();
      } else {
        code = 401;
        message = "Not Authorized for this route";
        const resData = customResponse({ code, message });
        return res.status(code).send(resData);
      }
    } catch (error) {
      code = 500;
      message = "Internal Server Error";
      const resData = customResponse({ code, message, error });
      return res.status(code).send(resData);
    }
  };
};
module.exports = { isAuthorized, hasPermission };
