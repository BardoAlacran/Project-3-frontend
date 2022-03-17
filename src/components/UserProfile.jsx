import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';
import AllPosts from './AllPosts';

function UserProfile() {
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [favs, setFavs] = useState([]);
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);

  useEffect(() => {
    apiService
      .getProfile(user._id)
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [user._id]);
  useEffect(() => {
    apiService
      .getOwnPosts({ user: user._id })
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [user._id]);

  useEffect(() => {
    apiService
      .getUserFavs()
      .then(userFavs => {
        setFavs(userFavs.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="Container">
      {isLoggedIn && (
        <div className="buttonContainer">
          <Link to={`/profile/edit`}>
            <button className="button">Edit Profile</button>
          </Link>
          <button className="button" onClick={logOutUser}>
            Logout
          </button>
        </div>
      )}
      <article className="card">
        <h1>
          <b>{profile.name}</b>
        </h1>
      </article>
      <h2>Own posts</h2>
      {posts.map(post => {
        return (
          <AllPosts
            key={post._id}
            id={post._id}
            body={post.body}
            userPost={post.user}
            date={post.date}
            theme={post.theme}
            level={post.level}
          />
        );
      })}
      <h2>Favourite posts</h2>
      {favs.map(fav => {
        return (
          <AllPosts
            key={fav._id}
            id={fav.post._id}
            body={fav.post.body}
            userPost={fav.post.user}
            date={fav.post.date}
            theme={fav.post.theme}
            level={fav.post.level}
          />
        );
      })}
    </div>
  );
}

export default UserProfile;
