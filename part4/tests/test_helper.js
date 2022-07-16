const Blog = require('../models/blog')
const User = require('../models/user')
const _ = require('lodash');

const listWithOneBlog = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    }
]

const listWithSeveralBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        //user: 'asdfadsf234234asd'
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        //user: 'asthrdty5t4334434'
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        //user: 'brefay65yrg434432'
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        //user: 'dgrdutyjrh6554gr2'
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        //user: 'dgrdutyjrh6554gr2'
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        //user: 'asthrdty5t4334434'
    }
]

const listWithOneUser = [
    {
        username: 'userman',
        name: 'User Man',
        passwordHash: 'passw0rd'
    }
]

const listWithSeveralUsers = [
    {
        username: 'userman',
        name: 'User Man',
        passwordHash: 'passw0rd'
    },
    {
        username: 'userwoman',
        name: 'User Woman',
        passwordHash: 'passw1rd'
    },
    {
        username: 'usernonbinary',
        name: 'User Nonbinary',
        passwordHash: 'passw2rd'
    },
    {
        username: 'Iso-M',
        name: 'Martti Ahtisaari',
        passwordHash: 'bigmoneymartti'
    }
]

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map((blog) => blog.likes);

    const reducer = (sum, item) => {
        return sum + item
    }

    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    }

    const favorite = blogs.reduce(reducer, 0)

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const authors = blogs.map((blog) => blog.author)
    const amountOfBlogs = _.values(_.groupBy(authors)).map(d => ({ author: d[0], blogs: d.length }));

    return amountOfBlogs[amountOfBlogs.length - 1]
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const amountOfLikes =
        _(blogs)
            .groupBy('author')
            .map((objs, key) => ({
                'author': key,
                'likes': _.sumBy(objs, 'likes')
            })).sortBy(blogs, ['likes'])
            .value()

    return amountOfLikes[amountOfLikes.length - 1]
}

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    listWithOneBlog,
    listWithSeveralBlogs,
    listWithOneUser,
    listWithSeveralUsers,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    nonExistingId,
    blogsInDb,
    usersInDb
}