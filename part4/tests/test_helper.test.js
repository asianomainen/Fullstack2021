const helper = require('./test_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = helper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(helper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = helper.totalLikes(helper.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = helper.totalLikes(helper.listWithSeveralBlogs)
        expect(result).toBe(36)
    })

})

describe('favorite blog', () => {
    test('is returned when there is one blog', () => {
        const result = helper.favoriteBlog(helper.listWithOneBlog)
        const expected = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }

        expect(result).toEqual(expected)
    })

    test('is returned when there are several blogs', () => {
        const result = helper.favoriteBlog(helper.listWithSeveralBlogs)
        const expected = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }

        expect(result).toEqual(expected)
    })

    test('is returned when there are no blogs', () => {
        const result = helper.favoriteBlog([])

        expect(result).toEqual({})
    })
})

describe('most blogs', () => {
    test('is returned when there is one blog', () => {
        expect(helper.mostBlogs(helper.listWithOneBlog)).toEqual({ "author": "Edsger W. Dijkstra", "blogs": 1 })
    })

    test('is returned when there are several blogs', () => {
        expect(helper.mostBlogs(helper.listWithSeveralBlogs)).toEqual({ "author": "Robert C. Martin", "blogs": 3 })
    })

    test('is returned when there are no blogs', () => {
        const result = helper.mostBlogs([])

        expect(result).toEqual({})
    })
})

describe('most likes', () => {
    test('is returned when there is one blog', () => {
        expect(helper.mostLikes(helper.listWithOneBlog)).toEqual({ "author": "Edsger W. Dijkstra", "likes": 5 })
    })

    test('is returned when there are several blogs', () => {
        expect(helper.mostLikes(helper.listWithSeveralBlogs)).toEqual({ "author": "Edsger W. Dijkstra", "likes": 17 })
    })

    test('is returned when there are no blogs', () => {
        const result = helper.mostLikes([])

        expect(result).toEqual({})
    })
})