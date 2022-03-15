import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function Profile() {
  const [profile, setProfile] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    apiService
      .getProfile(id)
      .then(response => {
        console.log(response.data);
        setProfile(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);
  console.log(profile);

  return (
    <div>
      <article className="card">
        <h1>
          <b>{profile.name}</b>
        </h1>
      </article>
    </div>
  );
}

export default Profile;
