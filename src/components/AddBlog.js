import React from 'react'
const AddBlog = ({ addBlog, newTitle, newAuthor, newUrl, newLikes, handleAuthorChange, handleLikesChange, handleTitleChange, handleUrlChange }) => {
  return (
    <form onSubmit={addBlog}>
      <div>title<input value={newTitle} onChange={handleTitleChange}/></div>
      <div>author<input value={newAuthor} onChange={handleAuthorChange}/></div>
      <div>url<input value={newUrl} onChange={handleUrlChange}/></div>
      <div>likes<input value={newLikes} onChange={handleLikesChange}/></div>
      <button type="submit">save</button>
    </form>
  )

}

export default AddBlog