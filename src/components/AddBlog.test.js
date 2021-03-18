/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlog from './AddBlog'

describe('<Blog />', () => {
  const handleTitleChange = jest.fn()
  const handleAuthorChange = jest.fn()
  const handleUrlChange = jest.fn()
  const addBlog = jest.fn()
  const blogTitle = 'Blog title'
  const blogAuthor = 'Blog author'
  const blogUrl = 'Blog url'

  test('calls the event handler it received as props', () => {
    const { container, queryByText } = render(
      <AddBlog
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        addBlog={addBlog}
      />
    )

    const form = container.querySelector('form')
    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')

    fireEvent.change(titleInput, {
      target: { value: blogTitle },
    })
    fireEvent.change(authorInput, {
      target: { value: blogAuthor },
    })
    fireEvent.change(urlInput, {
      target: { value: blogUrl },
    })

    

    fireEvent.submit(form)
    
    expect(handleTitleChange).toBeCalledTimes(1)
    expect(titleInput.value).toEqual(blogTitle)
    expect(handleAuthorChange).toBeCalledTimes(1)
    expect(authorInput.value).toEqual(blogAuthor)
    expect(handleUrlChange).toBeCalledTimes(1)
    expect(urlInput.value).toEqual(blogUrl)
    expect(addBlog).toBeCalledTimes(1)
  })
})
