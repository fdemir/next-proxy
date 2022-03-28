module.exports = (req, res, next) => {
  if (req.headers.authorization === process.env.SECURE_TOKEN) {
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized.",
    });
  }
};
