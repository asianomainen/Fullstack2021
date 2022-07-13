const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.listWithSeveralBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

const api = supertest(app)

describe('when there are initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.listWithSeveralBlogs.length)
    })

    test('a specific blog is returned', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)

        expect(contents).toContain('React patterns')
    })

    test('a nonexistent blog is not returned', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)

        expect(contents).not.toContain('Nonexistent')
    })

})

describe('viewing a specific blog', () => {
    test('succeeds with a valid id identifier', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.id)

        expect(contents).toBeDefined()
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

})

describe('adding a new blog', () => {
    test('succeeds with valid data', async () => {
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

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.listWithSeveralBlogs.length + 1)

        const contents = blogsAtEnd.map(r => r.title)
        expect(contents).toContain('Mauno Koiviston nousu ja tuho')
    })

    test('without likes sets the likes to 0', async () => {
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

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.listWithSeveralBlogs.length + 1)

        const blog = blogsAtEnd.find(blog => blog.title === 'Tarja Halonen - koko kansan presidentistä hylkiöksi')
        expect(blog.likes).toBe(0)
    })

    test('fails with status code 400 if title is missing', async () => {
        const newBlog = {
            author: 'Martti Ahtisaari',
            url: 'www.marttiahtisaari.com/UKK',
            likes: 8
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('fails with status code 400 if author is missing', async () => {
        const newBlog = {
            Title: 'Risto Ryti - mihin valtion rahat hävisivät?',
            url: 'www.marttiahtisaari.com/UKK',
            likes: 8
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('deleting a blog', () => {
    test('succeeds', async () => {
        let response = await api.get('/api/blogs')
        let blog = response.body.find(blog => blog.title === 'React patterns')

        expect(blog).toBeDefined()

        await api.delete(`/api/blogs/${blog.id}`)

        response = await api.get('/api/blogs')
        blog = response.body.find(blog => blog.title === 'React patterns')

        expect(blog).toBe(undefined)
    })
})

describe('modifying a blog', () => {
    test('succeeds', async () => {
        let response = await api.get('/api/blogs')
        let blog = response.body.find(blog => blog.title === 'React patterns')

        expect(blog.likes).toBe(7)

        const updatedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: 15
        }

        await api
            .put(`/api/blogs/${blog.id}`)
            .send(updatedBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        response = await api.get('/api/blogs')
        blog = response.body.find(blog => blog.title === 'React patterns')

        expect(blog.likes).toBe(15)
    })
})

afterAll(() => {
    mongoose.connection.close()
})