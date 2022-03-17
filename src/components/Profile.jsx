import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function Profile() {
  const [profile, setProfile] = useState([]);
  const { id } = useParams();

  const getProfile = async () => {
    try {
      const response = await apiService.getProfile(id);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
