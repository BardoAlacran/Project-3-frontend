import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiService from '../services/api.service';

function DeletePost() {
  const [singlePost, setSinglePost] = useState({});
  const [userPost, setUserPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getDetail = async () => {
    try {
      const detail = await apiService.getDetailPost(id);
      setSinglePost(detail.data);
      const { user } = detail.data;
      setUserPost(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    try {
      await apiService.deletePost(id);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Container">
      <h1 className="warning">Are you sure to delete this post?</h1>
      <article className="card">
        <h2>
          <b>{userPost.name}</b>
        </h2>
        <p>{singlePost.date}</p>
        <p>{singlePost.body}</p>
        <p>{singlePost.level}</p>
        <p>{singlePost.theme}</p>
      </article>

      <div className="buttonContainer">
        <button className="button" onClick={handleDelete}>
          Yes
        </button>
        <Link to={`/post/${id}`}>
          <button className="button">No</button>
        </Link>
      </div>
    </div>
  );
}

export default DeletePost;
