const express = require('express');
const usersController = require('../controllers/users');
const validate = require('../middlewares/validate');
const schemas = require('../schemas');
const authenticate = require('../middlewares/authenticate');
const restrictTo = require('../middlewares/restricatTo');

const router = express.Router();

router.post('/signUp', validate(schemas.signUpSchema), usersController.signUp);

router.post('/signIn', validate(schemas.signInSchema), usersController.signIn);

router.get('/',authenticate, restrictTo(['admin']), validate(schemas.getAllUsersSchema), usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.patch('/:id', validate(schemas.updateUserSchema), usersController.updateUser)

router.delete('/:id', usersController.deleteUser);

module.exports = router;