import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiService from '../services/api.service';

function DeletePost() {
  const [singlePost, setSinglePost] = useState({});
  const [userPost, setUserPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .getDetailPost(id)
      .then(response => {
        setSinglePost(response.data);
        const { user } = response.data;
        setUserPost(user);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleDelete = () => {
    apiService
      .deletePost(id)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
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
