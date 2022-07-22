import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const addBlogHandler = jest.fn()

    const testUser = {
        username: 'userman',
        name: 'User Man'
    }

    window.localStorage.setItem(
        'loggedUser', JSON.stringify(testUser)
    )

    const { container } = render(<BlogForm handleAddBlog={addBlogHandler} />)

    const user = userEvent.setup()

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const sendButton = container.querySelector('#create-button')

    await user.type(titleInput, 'Test title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'www.testurl.com')
    await user.click(sendButton)

    expect(addBlogHandler.mock.calls).toHaveLength(1)
    expect(addBlogHandler.mock.calls[0][0].title).toBe('Test title')
})