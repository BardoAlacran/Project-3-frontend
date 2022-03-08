import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function EditProfile() {
  const navigate = useNavigate();
  const [editedProfile, setEditedProfile] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { id } = useParams();

  useEffect(() => {
    apiService.getProfile(id).then(response => {
      setEditedProfile(response.data);
    });
  }, []);

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
      .editPost(editedProfile, id)
      .then(profileEdited => {
        console.log(profileEdited);

        navigate(`/profile/${profileEdited.data._id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log('newProfile:', editedProfile);
  return (
    <div className="LoginPage">
      <h1>Edit Profile</h1>

      <form className="card" onSubmit={handleEditSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={editedProfile.name} onChange={handleProfile} />

        <button className="button" type="submit">
          Edit
        </button>
      </form>

      <Link to={'/'}>
        <button className="button">Home</button>
      </Link>
    </div>
  );
}

export default EditProfile;
