/*
 * GET home page.
 */

exports.index = function (req, res) {

  res.render('pd', { title: 'ha-bu-su', subtitle: 'this is ha-bu-su'});

};