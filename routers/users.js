const express = require('express');
const usersController = require('../controllers/users');
const validate = require('../middlewares/validate');
const schemas = require('../schemas');

const router = express.Router();

router.post('/', validate(schemas.createUserSchema), usersController.createUser);

router.get('/', validate(schemas.getAllUsersSchema), usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.patch('/:id', validate(schemas.updateUserSchema), usersController.updateUser)

router.delete('/:id', usersController.deleteUser);

module.exports = router;