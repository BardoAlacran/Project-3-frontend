import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import AddFav from './AddFav';
import RemoveFav from './RemoveFav';

function AllPosts({ id, userPost, body, date, level, theme }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    apiService
      .getIsFav(id)
      .then(response => {
        setIsFav(response.data.isFavorite);
      })
      .catch(error => {
        console.log(error);
      });
  });

  const handleAddFav = () => {
    setIsFav(true);
  };

  const handleRemoveFav = () => {
    setIsFav(false);
  };
  console.log(isFav);
  return (
    <>
      <article className="card">
        <h2>
          <Link to={`/profile/${userPost._id}`}>
            <b>{userPost.name}</b>
          </Link>
        </h2>
        <p>{date}</p>
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
