function errorHandler(err, req, res, next) {
  res.status(500).json({ success: false, error: 'Server error!!!' });
}

module.exports = {errorHandler};