/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'www.web.com',
    id: '1',
    likes: 16,
    user: { name: 'Auth user' },
  }
  const onLikeClick = jest.fn()
  const onRemoveClick = jest.fn()
  const authUser = { name: 'Auth user', username: 'user' }

  test('renders the blogs title and author, but does not render its url or number of likes by default', () => {
    const { container, queryByText } = render(
      <Blog
        blog={blog}
        onLikeClick={onLikeClick}
        onRemoveClick={onRemoveClick}
        authUser={authUser}
      />
    )

    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(queryByText(blog.author)).toBeDefined()
    expect(queryByText(blog.url)).toBe(null)
    expect(queryByText(blog.user.name)).toBe(null)
    expect(queryByText(blog.likes + '')).toBe(null)
  })

})