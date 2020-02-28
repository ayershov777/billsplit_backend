const User = require('../models/User');
const createJwt = require('../utils/createJwt');

async function create(req, res) {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const token = createJwt(user);
    res.json({ token, user });
  }
  catch(err) {
    console.log(err);
  }
}

async function authenticate(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(!user) return res.status(401).json({ message: 'bad credentials' });
    const authenticated = await user.comparePassword(req.body.password);
    if(!authenticated) return res.status(401).json({ message: 'bad credentials' });
    const token = createJwt(user);
    res.json({ token });
  }
  catch(err) {
    console.log(err);
  }
}

module.exports = { create, authenticate };
