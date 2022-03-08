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
      <article className="card">
        <h2>
          <b>{userPost.name}</b>
        </h2>
        <p>{singlePost.date}</p>
        <p>{singlePost.body}</p>

        <div className="featureContainer">
          <p className="feature">{singlePost.level}</p>
          <p className="feature">{singlePost.theme}</p>
        </div>
        <div className="buttonContainer">
          <Link to={`/post/${id}/edit`}>
            <button className="button">Edit</button>
          </Link>
          <Link to={`/post/${id}/delete`}>
            <button className="button">Delete</button>
          </Link>
        </div>
      </article>

      <article>
        <Link to={'/'}>
          <button className="button">Home</button>
        </Link>
      </article>
    </div>
  );
}

export default DetailPost;
