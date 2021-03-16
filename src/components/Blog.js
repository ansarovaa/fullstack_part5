import React, {useState} from 'react'
const Blog = ({blog, onLikeClick}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [isVisible,
        setVisible] = useState(false);

    const handleToggle = () => {
        setVisible(!isVisible);
    }

    return (

        <div style ={blogStyle}>
            {blog.title}
            {blog.author}
            <button onClick={handleToggle} className='btn ml-8'>
                {isVisible
                    ? 'Hide'
                    : 'View'}
            </button>
            {isVisible && ( <> <p>{blog.url}</p> < p > Likes {blog.likes} < button onClick = {
                onLikeClick.bind(null, blog.id)
            }
            className = 'btn ml-8' > Like </button> </p> </>)}
        </div>

    )
}

export default Blog