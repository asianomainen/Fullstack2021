const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs')

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, passwordHash } = request.body

    if (username === undefined || passwordHash === undefined) {
        return response.status(400).json({
            error: 'username or password missing'
        })
    } else if (username.length < 3) {
        return response.status(400).json({
            error: 'username must be longer than 3 characters'
        })
    } else if (passwordHash.length < 3) {
        return response.status(400).json({
            error: 'password must be longer than 3 characters'
        })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    const hashedPassword = await bcrypt.hash(passwordHash, 10)

    const user = new User({
        username: username,
        name: name,
        passwordHash: hashedPassword
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter