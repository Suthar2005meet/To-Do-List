const router = require('express').Router()

const UserController = require('../Controller/UserController')

router.get('/all', UserController.getData)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router

