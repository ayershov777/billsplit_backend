const jwt = require('jsonwebtoken');

function createJwt(user) {
  return jwt.sign({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

module.exports = createJwt;
