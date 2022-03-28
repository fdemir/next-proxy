module.exports = (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username or password is missing.",
    });
  }

  if (username !== process.env.USERNAME || password !== process.env.PASSWORD) {
    return res.status(400).json({
      message: "Username or password is wrong.",
    });
  }

  return res.status(200).json({
    message: "Login successful.",
    accessToken: process.env.SECURE_TOKEN,
  });
};
