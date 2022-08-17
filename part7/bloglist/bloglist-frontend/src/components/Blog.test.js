import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Blog from './Blog'

describe('<Blog />', () => {
  const likeHandler = jest.fn()

  beforeEach(() => {
    const testBlog = {
      title: 'Test title',
      author: 'Test Author',
      url: 'www.testurl.com',
      likes: 10,
      user: {
        username: 'userman',
        name: 'User Man',
      },
    }

    const testUser = {
      username: 'userman',
      name: 'User Man',
    }

    window.localStorage.setItem('loggedUser', JSON.stringify(testUser))

    render(<Blog blog={testBlog} handleLike={likeHandler} />)
  })

  test('renders only visible blog content', () => {
    const title = screen.findByText('Test title')
    const author = screen.findByText('Test Author')
    const url = screen.queryByText('www.testurl.com')
    const likes = screen.queryByText('10')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders hidden content when "View" button is pressed', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const url = screen.findByText('www.testurl.com')
    const likes = screen.findByText('10')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('like event handler is called twice when button clicked twice', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
