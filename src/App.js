import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
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
            const user = await loginService.login({username, password})
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
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}/>
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}/>
            </div>
            <button type="submit">login</button>
        </form>
    )

    const blogForm = () => (
        <form onSubmit={addBlog}>
            <div>title<input value={newTitle} onChange={handleTitleChange}/></div>
            <div>author<input value={newAuthor} onChange={handleAuthorChange}/></div>
            <div>url<input value={newUrl} onChange={handleUrlChange}/></div>
            <div>likes<input value={newLikes} onChange={handleLikesChange}/></div>
            <button type="submit">save</button>
        </form>
    )

    const logOut = (event) => {
        window
            .localStorage
            .setItem('loggedNoteappUser', null);
        setUser(null);

    }

    return (
        <div>

            <Error message={errorMessage}/> {user === null

                ? loginForm()
                : <div>
                    <p>{user.name}
                        logged-in
                        <button type="button" onClick={logOut}>logout</button>
                    </p>

                    <h2>blogs</h2>
                    {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}

                    {blogForm()}

                </div>
}

        </div>
    )
}

export default App