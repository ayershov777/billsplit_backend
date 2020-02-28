const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  let token = req.get('Authorization');
  if(token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) next(err);
      else {
        req.user = decoded.user,
        next();
      }
    })
  }
  else next();
}

function authorize(req, res, next) {
  if(req.user) next();
  else res.status(403).json({ message: 'You don\'t have permission to do that '});
}

module.exports = { authenticate, authorize };
