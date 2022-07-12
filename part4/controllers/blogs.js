const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.title === undefined || body.url === undefined) {
        response.status(400).json()
    }

    body.likes = body.likes || 0

    const blog = new Blog(body)

    await blog.save()
    response.status(201).json(blog)
})

module.exports = blogsRouter