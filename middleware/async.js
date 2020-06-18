const asyncHandler = function (func) {
  return function (req, res, next) {
    return Promise.resolve(fun(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
