const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listHelper.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listHelper.listWithSeveralBlogs)
        expect(result).toBe(36)
    })

})

describe('favorite blog', () => {
    test('is returned when there is one blog', () => {
        const result = listHelper.favoriteBlog(listHelper.listWithOneBlog)
        const expected = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }

        expect(result).toEqual(expected)
    })

    test('is returned when there are several blogs', () => {
        const result = listHelper.favoriteBlog(listHelper.listWithSeveralBlogs)
        const expected = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }

        expect(result).toEqual(expected)
    })

    test('is returned when there are no blogs', () => {
        const result = listHelper.favoriteBlog([])

        expect(result).toEqual({})
    })
})

describe('most blogs', () => {
    test('is returned when there is one blog', () => {
        expect(listHelper.mostBlogs(listHelper.listWithOneBlog)).toEqual({"author": "Edsger W. Dijkstra", "blogs": 1})
    })

    test('is returned when there are several blogs', () => {
        expect(listHelper.mostBlogs(listHelper.listWithSeveralBlogs)).toEqual({"author": "Robert C. Martin", "blogs": 3})
    })

    test('is returned when there are no blogs', () => {
        const result = listHelper.mostBlogs([])

        expect(result).toEqual({})
    })
})

describe('most likes', () => {
    test('is returned when there is one blog', () => {
        expect(listHelper.mostLikes(listHelper.listWithOneBlog)).toEqual({"author": "Edsger W. Dijkstra", "likes": 5})
    })

    test('is returned when there are several blogs', () => {
        expect(listHelper.mostLikes(listHelper.listWithSeveralBlogs)).toEqual({"author": "Edsger W. Dijkstra", "likes": 17})
    })

    test('is returned when there are no blogs', () => {
        const result = listHelper.mostLikes([])

        expect(result).toEqual({})
    })
})