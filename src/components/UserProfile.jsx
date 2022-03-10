import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';

function UserProfile() {
  const [profile, setProfile] = useState([]);
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
  }, []);

  console.log('user:', user._id);
  console.log(profile);

  return (
    <div className="Container">
      <article className="card">
        <h1>
          <b>{profile.name}</b>
        </h1>
      </article>
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
    </div>
  );
}

export default UserProfile;
