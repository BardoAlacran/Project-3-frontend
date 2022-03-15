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
        // console.log('1 data:', response.data);
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [user._id]);
  // console.log('user:', user._id);
  // console.log('profile:', profile);
  // console.log('2 posts:', posts);
  // console.log('user id:', user._id);

  useEffect(() => {
    apiService
      .getUserFavs()
      .then(userFavs => {
        setFavs(userFavs.data);
      })
      .catch(error => {
        console.log(error);
      });
  });

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
      <h2>My own</h2>
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
      {favs.map(fav => {
        return <h1 key={fav._id}>{fav._id}</h1>;
      })}
    </div>
  );
}

export default UserProfile;
