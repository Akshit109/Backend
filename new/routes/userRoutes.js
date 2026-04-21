const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/api/userdata', userController.getAllUsers);
router.get('/userdata/:id', userController.getUserById);
router.post('/userData', userController.createUser);
router.delete('/userdata/:id', userController.deleteUser);
router.patch('/userdata/:id', userController.updateUser);

module.exports = router;