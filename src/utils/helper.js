//customResponse
const customResponse = ({ code = 200, message = "", data = {}, err = {} }) => {
  const responseStatus = code < 300 ? "success" : "failure";
  return {
    status: responseStatus,
    code: code,
    message: message,
    data: data,
    error: err,
  };
};

module.exports = { customResponse };
