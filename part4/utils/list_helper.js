const _ = require('lodash');

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
    const amountOfBlogs = _.values(_.groupBy(authors)).map(d => ({author: d[0], blogs: d.length}));

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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}