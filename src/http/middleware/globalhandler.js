module.exports = {
  errorHandler: (error, req, res, next) => {
    if (error) {
      return res.status(error.status || 500).json({
        success: false,
        error: error.message,
      });
    }

    next();
  },

  notFoundHandler: (req, res, next) => {
    res.send("404:: Endpoint not found");
  },
};
