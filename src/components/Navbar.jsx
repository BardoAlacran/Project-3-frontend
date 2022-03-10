import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <nav className="navBar">
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to={'/add'}>
            <button>Add Post</button>
          </Link>

          <Link to={'/profile/userprofile'}>
            <span>{user && user.name}</span>
          </Link>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {' '}
            <button>Sign Up</button>{' '}
          </Link>
          <Link to="/login">
            {' '}
            <button>Login</button>{' '}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
