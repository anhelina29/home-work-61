const express = require('express');
const router = express.Router();
const usersCtrl = require('./users.ctrl');
const usersValidator = require('./usersValidator');
const authMiddleware = require('../common/middlewares/auth');
const passport = require('passport');


router.get('/render', usersCtrl.renderUsers);
router.get('/render/:id', usersCtrl.renderUsersById)
router.get('/:id', authMiddleware.checkAuth, usersCtrl.getUsersByIdHandler);
router.put('/:id', authMiddleware.checkAuth, usersValidator.putUsersValidator, usersCtrl.putUsersByIdHandler);
router.delete('/:id', authMiddleware.checkAuth, usersCtrl.deleteUsersByIdHandler);

router.post('/sign-up', usersCtrl.signUp);
router.post('/login', passport.authenticate('local'), usersCtrl.login);
router.post('/logout', usersCtrl.logout);

module.exports = router;