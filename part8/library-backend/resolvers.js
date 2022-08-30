const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')

      if (!args.author && !args.genre) {
        return books
      } else if (args.author && !args.genre) {
        return books.filter((book) => book.author === args.author)
      } else if (!args.author && args.genre) {
        return books.filter((book) => book.genres.includes(args.genre))
      } else {
        return books
          .filter((book) => {
            return book.author === args.author
          })
          .filter((book) => book.genres.includes(args.genre))
      }
    },
    allAuthors: async () => {
      return await Author.find({}).populate('books')
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Book: {
    author: async (root) => {
      return await Author.findOne({ _id: root.author })
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const user = context.currentUser
      if (!user) {
        throw new AuthenticationError('User not authorized')
      }

      let author = await Author.findOne({ name: args.author })
      let newBook

      if (!author) {
        author = new Author({
          name: args.author,
          bookCount: 1,
        })
      }

      newBook = new Book({ ...args, author: author.id })
      author.books = author.books.concat(newBook.id)

      try {
        await newBook.save()
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook
    },
    editAuthor: async (root, args, context) => {
      const user = context.currentUser
      if (!user) {
        throw new AuthenticationError('User not authorized')
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo
      await author.save()

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong crendentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
