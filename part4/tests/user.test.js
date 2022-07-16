const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = helper.listWithSeveralUsers
        .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

const api = supertest(app)

describe('when there are initially some users added', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(helper.listWithSeveralUsers.length)
    })

    test('a specific user is returned', async () => {
        const response = await api.get('/api/users')
        const contents = response.body.map(r => r.username)

        expect(contents).toContain('Iso-M')
    })

    test('a nonexistent user is not returned', async () => {
        const response = await api.get('/api/users')
        const contents = response.body.map(r => r.username)

        expect(contents).not.toContain('Nonexistent')
    })
})

describe('adding a new user', () => {
    test('succeeds with valid data', async () => {
        const newUser = {
            username: 'UrhoBoi',
            name: 'Urho Kalevi Kekkonen',
            passwordHash: 'IsoPahaUrho'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(helper.listWithSeveralUsers.length + 1)

        const contents = usersAtEnd.map(r => r.username)
        expect(contents).toContain('UrhoBoi')
    })

    test('fails with status code 400 if username is missing', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Urho Kalevi Kekkonen',
            passwordHash: 'IsoPahaUrho'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username or password missing')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('fails with status code 400 if password is missing', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'UrhoBoi',
            name: 'Urho Kalevi Kekkonen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username or password missing')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('fails with status code 400 if username already exists', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'userman',
            name: 'Pehr Evind Svinhufvud',
            passwordHash: 'intetalarfinska'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

afterAll(() => {
    mongoose.connection.close()
})