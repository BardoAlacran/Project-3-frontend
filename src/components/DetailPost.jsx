import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';

function DetailPost() {
  // const { user } = useContext(AuthContext);
  const [singlePost, setSinglePost] = useState({});
  const [userPost, setUserPost] = useState({});
  const [isFav, setIsFav] = useState(false);

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
  }, [id]);

  useEffect(() => {
    apiService
      .getIsFav(id)
      .then(response => {
        console.log('data:', response.data.user);
        if (response.data.post === id) {
          console.log(true);
          setIsFav('yes');
        } else {
          console.log('no');
          setIsFav(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);
  console.log('isfav?:', isFav);
  return (
    <div className="Container">
      <article className="card">
        <h2>
          <Link to={`/profile/${userPost._id}`}>
            <b>{userPost.name}</b>
          </Link>
        </h2>
        <p>{singlePost.date}</p>
        <div className="featureContainer">
          <p className="feature">{singlePost.level}</p>
          <p className="feature">{singlePost.theme}</p>
        </div>
        <p>{singlePost.body}</p>

        <div className="buttonContainer">
          {isFav ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="yellow">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )}
          <Link to={`/post/${id}/edit`}>
            <button className="button">Edit</button>
          </Link>
          <Link to={`/post/${id}/delete`}>
            <button className="button">Delete</button>
          </Link>
        </div>
      </article>
    </div>
  );
}

export default DetailPost;
