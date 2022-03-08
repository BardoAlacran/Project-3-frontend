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
      .editProfile(editedProfile, id)
      .then(profileEdited => {
        console.log('profile edited:', profileEdited);

        navigate(`/profile/${profileEdited.data._id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log('editedProfile:', editedProfile);
  return (
    <div>
      <h1>Edit Profile</h1>

      <form className="card" onSubmit={handleEditSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={editedProfile.name} onChange={handleProfile} />

        <button className="button" type="submit">
          Submit Edit
        </button>
      </form>

      <Link to={'/'}>
        <button className="button">Home</button>
      </Link>
    </div>
  );
}

export default EditProfile;
