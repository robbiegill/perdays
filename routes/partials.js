
exports.byName = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};