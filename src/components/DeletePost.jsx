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
  }, []);

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
    <>
      <div>
        <article>
          <h2>{userPost.name}</h2>
          <p>{singlePost.date}</p>
          <p>{singlePost.body}</p>
          <p>{singlePost.level}</p>
          <p>{singlePost.theme}</p>
        </article>

        <article>
          <button onClick={handleDelete}>Delete</button>
        </article>

        <article>
          <Link to={'/'}>
            <button>To home bitch </button>
          </Link>
        </article>
      </div>
    </>
  );
}

export default DeletePost;
