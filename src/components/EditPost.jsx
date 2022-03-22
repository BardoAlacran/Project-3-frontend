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

  const getDetail = async () => {
    try {
      const detail = await apiService.getDetailPost(id);
      setEditedPost(detail.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePost = e => {
    setEditedPost(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleAddSubmit = async e => {
    e.preventDefault();
    try {
      const postEdited = await apiService.editPost(editedPost, id);
      navigate(`/post/${postEdited.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Container">
      <h1>Edit Post</h1>

      <form className="card" onSubmit={handleAddSubmit}>
        <label>Body:</label>
        <textarea type="text" name="body" value={editedPost.body} onChange={handlePost} />

        <label>Theme:</label>
        <select type="text" name="theme" value={editedPost.theme} onChange={handlePost}>
          <option value="Science">Science</option>
          <option value="Anime">Anime</option>
          <option value="Computing">Computing</option>
          <option value="Gardening">Gardening</option>
          <option value="Gaming">Gaming</option>
          <option value="Curiosities">Curiosities</option>
        </select>

        <label>Level:</label>
        <select type="text" name="level" value={editedPost.level} onChange={handlePost}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Godlike">Godlike</option>
        </select>

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
