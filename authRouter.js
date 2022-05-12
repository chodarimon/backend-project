const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');

router.post('/registration', [
  check('username', "No spaces are allowed in the username").custom(value => !/\s/.test(value)),
  check('username', "Username cannot be empty").notEmpty(),
  check('password', "Password length must be between 3 and 10 symbols").isLength({ min: 3, max: 10 })
], controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;