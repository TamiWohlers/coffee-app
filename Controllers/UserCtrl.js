// Dependencies
var User = require('../models/user.js');

module.exports = {

  // Create endpoint /api/users for POST
  create: function(req, res) {
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'New user added!' });
    });
  },

  // Create endpoint /api/users for GET
  read: function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);

      res.json(users);
    });
  }

};