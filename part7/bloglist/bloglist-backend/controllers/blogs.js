const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user.id,
    comments: [],
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)

  if (!blogToDelete) {
    return response.status(204).end()
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== user.id) {
    return response.status(401).json({
      error: 'only the creator can delete a blog',
    })
  }

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  response.json(updatedBlog)
})

router.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment
  const updatedBlog = await Blog.findById(request.params.id)
  updatedBlog.comments = updatedBlog.comments.concat(comment)
  await updatedBlog.save()

  return response.status(201).json(updatedBlog)
})

module.exports = router
