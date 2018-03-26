module.exports = (req, res) => {
  res.json({
    running: true,
    uptime: process.uptime(),
  });
};
