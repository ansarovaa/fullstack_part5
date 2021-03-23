/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLikeClick, authUser, onRemoveClick, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [isVisible,
    setVisible] = useState(false)

  const handleToggle = () => {
    setVisible(!isVisible)
  }

  return (

    <div style ={blogStyle} className='blog'>
      <div className = 'blogList'>
        <span className = 'blog-title'>{blog.title}</span>
        <span className = 'blog-author'>{blog.author}</span>
        {isVisible && ( <> <span>{blog.url}</span> <span> Likes {blog.likes} < button onClick = {onLikeClick.bind(null, blog.id)}
          className = 'btn ml-8'>Like</button> by {blog.user.username}</span></>)}</div>
      <div className = 'buttons'> <button onClick={handleToggle} className='btn ml-8' id = 'hideViewButton'>
        {isVisible
          ? 'Hide'
          : 'View'}
      </button>

      {authUser.username === blog.user.username && (
        <button onClick={onRemoveClick.bind(
          null,
          blog.id,
          blog.title,
          blog.author
        )} className='btn mt-12 blog-item-remove-btn'>Remove</button>)}</div>
   

     
    </div>

  )
}

export default Blog