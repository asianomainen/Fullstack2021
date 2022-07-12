const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.listWithSeveralBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

const api = supertest(app)

describe('blogs', () => {
    test('are returned as json in the correct amount', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.listWithSeveralBlogs.length)
    })

    test('have unique identifier named id', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.id)

        expect(contents).toBeDefined()
    })

    test('can be posted', async () => {
        const newBlog = {
            title: 'Mauno Koiviston nousu ja tuho',
            author: 'Martti Ahtisaari',
            url: 'www.marttiahtisaari.com/mauno',
            likes: 31
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.listWithSeveralBlogs.length + 1)

        const contents = response.body.map(r => r.title)
        expect(contents).toContain('Mauno Koiviston nousu ja tuho')
    })

    test('likes default to 0 if not specified', async () => {
        const newBlog = {
            title: 'Tarja Halonen - koko kansan presidentistä hylkiöksi',
            author: 'Martti Ahtisaari',
            url: 'www.marttiahtisaari.com/tarja',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.listWithSeveralBlogs.length + 1)

        const blog = response.body.find(blog => blog.title === 'Tarja Halonen - koko kansan presidentistä hylkiöksi')
        expect(blog.likes).toBe(0)
    })

    test('cannot be posted without title or url', async () => {
        const newBlog = {
            author: 'Martti Ahtisaari',
            url: 'www.marttiahtisaari.com/UKK',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    mongoose.connection.close()
})