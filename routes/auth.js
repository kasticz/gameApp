const express = require('express')
const {login,register,validateToken} = require('../controllers/auth')


const router = express.Router()


router.post('/',validateToken)
router.post('/login',login)
router.post('/register',register)


module.exports = router