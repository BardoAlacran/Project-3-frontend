import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function EditPost() {
  const navigate = useNavigate();
  const [editedPost, setEditedPost] = useState({
    body: '',
    theme: '',
    level: '',
  });
  const { id } = useParams();

  useEffect(() => {
    apiService.getDetailPost(id).then(response => {
      setEditedPost(response.data);
    });
  }, [id]);

  const handlePost = e => {
    setEditedPost(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleAddSubmit = e => {
    e.preventDefault();

    apiService
      .editPost(editedPost, id)
      .then(postEdited => {
        console.log(postEdited);

        navigate(`/post/${postEdited.data._id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log('newPost:', editedPost);
  return (
    <div className="Container">
      <h1>Edit Post</h1>

      <form className="card" onSubmit={handleAddSubmit}>
        <label>Body:</label>
        <input type="text" name="body" value={editedPost.body} onChange={handlePost} />

        <label>Theme:</label>
        <input type="text" name="theme" value={editedPost.theme} onChange={handlePost} />

        <label>Level:</label>
        <input type="text" name="level" value={editedPost.level} onChange={handlePost} />

        <button className="button" type="submit">
          Edit
        </button>
      </form>

      <Link to={`/post/${id}`}>
        <button className="button">Back to detail</button>
      </Link>
    </div>
  );
}

export default EditPost;
