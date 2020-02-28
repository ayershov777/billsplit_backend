const router = require('express').Router();
const usersCtrl = require('../controllers/users');
const { authenticate, authorize } = require('../middleware/auth');

// router.get('/', authorize, usersCtrl.index);
// router.get('/:username', authorize, usersCtrl.show);
router.post('/', usersCtrl.create);
router.post('/authenticate', usersCtrl.authenticate);
// router.put('/:username', authorize, usersCtrl.update);
// router.delete('/:username', authorize, usersCtrl.remove);

module.exports = router;
