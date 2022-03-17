import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import AddFav from './AddFav';
import RemoveFav from './RemoveFav';

function DetailPost() {
  const [singlePost, setSinglePost] = useState({
    date: Date.now(),
  });
  const [userPost, setUserPost] = useState({});
  const [isFav, setIsFav] = useState(false);
  const { id } = useParams();

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

  const isFavourite = async () => {
    try {
      const response = await apiService.getIsFav(id);
      setIsFav(response.data.isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
    isFavourite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <p>{singlePost.date.toString().slice(0, 10)}</p>
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
