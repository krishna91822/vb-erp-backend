/**
 * @ Custom Response Helper
 */
const customResponse = ({
  code = 200,
  message = "",
  data = {},
  err = {},
  totalResult,
  totalCount,
}) => {
  const responseStatus = code < 300 ? "success" : "failure";
  return {
    status: responseStatus,
    code,
    totalResult,
    totalCount,
    data,
    message,
    error: err,
  };
};

/**
 * @ Custom Pagination Helper
 */
const customPagination = ({ data = [], limit = 15, page = 1 }) => {
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
