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

  const getProfile = async () => {
    try {
      const response = await apiService.getProfile(user._id);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await apiService.getOwnPosts({ user: user._id });
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserFavs = async () => {
    try {
      const response = await apiService.getUserFavs();

      let fav = [];

      response.data.map(element => {
        fav.push(element.post);
      });

      setFavs(fav);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
    getUserPosts();
    getUserFavs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {posts === undefined ? (
        <p>charging...</p>
      ) : (
        posts.map(post => {
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
        })
      )}

      <h2>Favourite posts</h2>
      {favs.map(fav => {
        return (
          <AllPosts
            key={fav._id}
            id={fav._id}
            body={fav.body}
            userPost={fav.user}
            date={fav.date}
            theme={fav.theme}
            level={fav.level}
          />
        );
      })}
    </div>
  );
}

export default UserProfile;
