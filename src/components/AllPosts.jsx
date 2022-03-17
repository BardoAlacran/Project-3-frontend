import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import AddFav from './AddFav';
import RemoveFav from './RemoveFav';

function AllPosts({ id, userPost, body, date, level, theme }) {
  const [isFav, setIsFav] = useState(false);

  const isFavourite = async () => {
    try {
      const response = await apiService.getIsFav(id);
      setIsFav(response.data.isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
    <>
      <article className="card">
        <h2>
          <Link to={`/profile/${userPost._id}`}>
            <b>{userPost.name}</b>
          </Link>
        </h2>
        <p>{date.slice(0, 10)}</p>
        <div className="featureContainer">
          <p className="feature">{level}</p>
          <p className="feature">{theme}</p>
        </div>
        <Link to={`/post/${id}`}>
          <p>{body}</p>
        </Link>
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
    </>
  );
}

export default AllPosts;
