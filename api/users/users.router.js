const express = require('express');
const router = express.Router();
const usersCtrl = require('./users.ctrl');
const usersValidator = require('./usersValidator');
const usersAuth = require('./users.auth');

router.get('/', usersCtrl.getUsersHandler);
router.get('/:id', usersCtrl.getUsersByIdHandler);
router.post('/', usersValidator.postUsersValidator, usersCtrl.postUsersHandler);
router.post('/:id', usersAuth, usersValidator.postUsersValidator, usersCtrl.postUsersByIdHandler);
router.put('/:id', usersAuth, usersValidator.putUsersValidator, usersCtrl.putUsersByIdHandler);
router.delete('/:id', usersAuth, usersCtrl.deleteUsersByIdHandler);

module.exports = router;