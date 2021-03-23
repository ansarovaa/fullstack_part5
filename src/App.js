import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs,
    setBlogs] = useState([])
  const [newTitle,
    setNewTitle] = useState('')
  const [newAuthor,
    setNewAuthor] = useState('')
  const [newUrl,
    setNewUrl] = useState('')
  const [newLikes,
    setNewLikes] = useState('')
  const [username,
    setUsername] = useState('')
  const [password,
    setPassword] = useState('')
  const [user,
    setUser] = useState(null)
  const [errorMessage,
    setErrorMessage] = useState(null)
  const [message,
    setMessage] = useState(null)
  const [addBlogVisible] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const hideWhenVisible = {
    display: addBlogVisible
      ? 'none'
      : ''
  }
  // eslint-disable-next-line no-unused-vars
  const showWhenVisible = {
    display: addBlogVisible
      ? ''
      : 'none'
  }
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window
      .localStorage
      .getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes('')
        setMessage(`Added blog ${returnedBlog.title} by ${returnedBlog.author}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }
  const handleLikesChange = (event) => {
    console.log(event.target.value)
    setNewLikes(event.target.value)
  }
  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window
        .localStorage
        .setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
                username
        <input id = "username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
                password
        <input id = "password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  // eslint-disable-next-line no-unused-vars
  const logOut = (event) => {
    window
      .localStorage
      .removeItem('loggedNoteappUser')
    setUser(null)

  }

  const handleBlogLikeClick = async(id) => {
    const blogToUpdate = blogs.find((item) => item.id === id)
    if (blogToUpdate) {
      try {
        const likes = blogToUpdate.likes
          ? blogToUpdate.likes + 1
          : 1
        const updatedBlog = {
          ...blogToUpdate,
          likes
        }
        const response = await blogService.updateBlog(id, updatedBlog)
        if (response) {
          const updatedBlogList = blogs.map((item) => item.id === id
            ? updatedBlog
            : item)
          setBlogs(updatedBlogList)
        }
      } catch (error) {
        const { data, statusText } = error.response
        setMessage({
          message: data.error || statusText,
          type: 'unsuccessful'
        })
        console.warn(error)
      }
    }
  }

  const handleBlogRemoveClick = async(id, title, author) => {
    const message = `Remove blog ${title} by ${author}`
    if (window.confirm(message)) {
      try {
        await blogService.deleteBlog(id)
        const updatedBlogList = blogs.filter((item) => item.id !== id)
        setBlogs(updatedBlogList)
      } catch (error) {
        const { data, statusText } = error.response
        setErrorMessage({
          message: data.error || statusText,
          type: 'unsuccessful'
        })
        console.warn(error)
      }
    }
  }

  return (
    <div>
      <Notification message={message}/>
      <Error message={errorMessage}/> {user === null

        ? loginForm()
        : <div>
          <p>{user.name}
                        logged-in
            <button id = "logout" onClick={logOut}>logout</button>
          </p>

          <h2>blogs</h2>
          {blogs.sort((first, second) => second.likes - first.likes).map(blog => <Blog
            key={blog.id}
            blog={blog}
            onLikeClick={handleBlogLikeClick}
            onRemoveClick={handleBlogRemoveClick}
            authUser={user}/>)}
          <Togglable buttonLabel="Show Add blog form">
            <AddBlog
              addBlog={addBlog}
              newTitle={newTitle}
              mewAuthor={newAuthor}
              newUrl={newUrl}
              newLikes={newLikes}
              handleAuthorChange={handleAuthorChange}
              handleLikesChange={handleLikesChange}
              handleTitleChange={handleTitleChange}
              handleUrlChange={handleUrlChange}/>
          </Togglable>
        </div>
      }

    </div>
  )
}

export default App
