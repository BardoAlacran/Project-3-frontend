import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';

function AddPost() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState({
    body: '',
    theme: '',
    level: '',
  });

  const handlePost = e => {
    setNewPost(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleAddSubmit = async e => {
    e.preventDefault();
    try {
      const postCreated = await apiService.addPost(newPost);

      navigate(`/post/${postCreated.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  if (!isLoggedIn) {
    return (
      <div className="Container">
        <article className="card">
          <h2>You must be logged in to add a post</h2>
        </article>
      </div>
    );
  } else {
    return (
      <div className="Container">
        <h1>Add Post</h1>

        <form className="card" onSubmit={handleAddSubmit}>
          <label>Body:</label>

          <textarea type="text" name="body" value={newPost.body} onChange={handlePost} />

          <label>Theme:</label>
          <input type="text" name="theme" value={newPost.theme} onChange={handlePost} />

          <label>Level:</label>
          <input type="text" name="level" value={newPost.level} onChange={handlePost} />

          <button className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddPost;
