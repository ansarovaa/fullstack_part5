import React from 'react'
const AddBlog = ({ addBlog, newTitle, newAuthor, newUrl, newLikes, handleAuthorChange, handleLikesChange, handleTitleChange, handleUrlChange }) => {
  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <div>title<input id = "title" value={newTitle} onChange={handleTitleChange}/></div>
        <div>author<input id = "author" value={newAuthor} onChange={handleAuthorChange}/></div>
        <div>url<input id = "url" value={newUrl} onChange={handleUrlChange}/></div>
        <div>likes<input id = "like" value={newLikes} onChange={handleLikesChange}/></div>
        <button type="submit">save</button>
      </form>
    </div>
  )

}

export default AddBlog