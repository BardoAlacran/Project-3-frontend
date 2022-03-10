import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';

function AddPost() {
  const navigate = useNavigate();

  //const [body, setBody] = useState('');
  //const [level, setLevel] = useState('');
  //const [theme, setTheme] = useState('');
  const [newPost, setNewPost] = useState({
    body: '',
    theme: '',
    level: '',
  });

  const handlePost = e => {
    //setNewPost(prev =>  [{...prev, [e.target.name]: e.target.value}]);
    setNewPost(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleAddSubmit = e => {
    e.preventDefault();

    apiService
      .addPost(newPost)
      .then(postCreated => {
        console.log(postCreated);

        navigate(`/post/${postCreated.data._id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // const handleBody = e => {
  //   setBody(e.target.value);
  // };
  // const handleTheme = e => {
  //   setTheme(e.target.value);
  // };
  // const handleLevel = e => {
  //   setLevel(e.target.value);
  // };

  console.log('newPost:', newPost);
  return (
    <div className="Container">
      <h1>Add Post</h1>

      <form className="card" onSubmit={handleAddSubmit}>
        <label>Body:</label>
        <input type="text" name="body" value={newPost.body} onChange={handlePost} />

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

export default AddPost;
