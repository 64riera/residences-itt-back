const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user.model')

var userController = {}

userController.registerUser = (req, res) => {

}

userController.loginUser = (req, res) => {

}

userController.getUsers = async (req, res) => {
    try {
        var users = await User.find()
        res.status(200).send({users})
    } catch (err) {
        res.status(500).send({err})
    }
}

module.exports = userController