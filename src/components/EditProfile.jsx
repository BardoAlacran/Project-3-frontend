import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';

function EditProfile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editedProfile, setEditedProfile] = useState({
    email: user.email,
    name: user.name,
  });

  useEffect(() => {
    apiService.getProfile(user._id).then(response => {
      setEditedProfile(response.data);
    });
  }, [user._id]);

  const handleProfile = e => {
    setEditedProfile(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleEditSubmit = e => {
    e.preventDefault();

    apiService
      .editProfile(editedProfile)
      .then(() => {
        navigate('/profile/userprofile');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="Container">
      <h1>Edit Profile</h1>

      <form className="card" onSubmit={handleEditSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={editedProfile.name} onChange={handleProfile} />

        <button className="button" type="submit">
          Submit Edit
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
