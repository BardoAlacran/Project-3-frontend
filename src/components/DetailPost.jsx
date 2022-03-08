import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function DetailPost() {
  const [singlePost, setSinglePost] = useState({});
  const [userPost, setUserPost] = useState({});
  const { id } = useParams();

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

  return (
    <div>
      <article>
        <h2>{userPost.name}</h2>
        <p>{singlePost.date}</p>
        <p>{singlePost.body}</p>
        <p>{singlePost.level}</p>
        <p>{singlePost.theme}</p>
      </article>

      <article>
        <Link to={'/'}>
          <button>Home</button>
        </Link>
      </article>
    </div>
  );
}

export default DetailPost;
