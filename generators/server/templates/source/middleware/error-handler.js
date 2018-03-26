module.exports = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json(err);
  }
  if (err.name === 'ValidationError') {
    return res.status(422).json(err);
  }
  if (err.isBoom) {
    return res
      .status(err.output.statusCode)
      .json(err.output.payload);
  }
  console.log(err);
  res.status(500).json(err);
};
