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

  
//customPagination
const customPagination = ({ data = [], limit = 10, page = 1 }) => {
  const totalCount = data.length;
  const pageCount = Math.ceil(totalCount / limit);
  const currentPage = page;
  const results = data.slice((page - 1) * limit, page * limit);
  return {
    pageCount,
    totalCount,
    currentPage,
    results,
  };
};

module.exports = { customResponse, customPagination };
