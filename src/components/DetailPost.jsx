import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import AddFav from './AddFav';
import RemoveFav from './RemoveFav';

function DetailPost() {
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
        setIsFav(response.data.isFavorite);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleAddFav = () => {
    setIsFav(true);
  };

  const handleRemoveFav = () => {
    setIsFav(false);
  };

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
          {isFav ? <RemoveFav id={id} onRemove={handleRemoveFav} /> : <AddFav id={id} onAdd={handleAddFav} />}
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
