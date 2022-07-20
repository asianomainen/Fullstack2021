const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = request.user

    if (body.title === undefined || body.url === undefined) {
        return response.status(400).json({
            error: 'title or url missing'
        })
    }

    body.likes = body.likes || 0

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!(blog.user.toString() === user.id.toString())) {
        return response.status(401).json({ error: 'only the orignal poster can delete a blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!(blog.user.toString() === user.id.toString())) {
        return response.status(401).json({ error: 'only the orignal poster can update a blog' })
    }

    const body = request.body

    const updatedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    }

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    response.status(201).json(updatedBlog)
})

module.exports = blogsRouter