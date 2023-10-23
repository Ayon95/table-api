function handleError(error, req, res, next) {
  console.log(error.stack);

  if (error.name === 'JsonWebTokenError') {
    return res.status(403).json({ name: error.name, message: 'Invalid token provided' });
  }

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ name: error.name, message: error.message });
  }

  return res
    .status(error.status || 500)
    .json({ name: error.name, message: error.message || 'Internal server error' });
}

export default handleError;
