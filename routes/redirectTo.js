function red(path) {
  return function (req, res) {
    res.redirect(path);
  };

}

module.exports = red;