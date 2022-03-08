import { Route, Routes } from 'react-router-dom';
import AddPost from './components/AddPost';
import DeletePost from './components/DeletePost';
import DetailPost from './components/DetailPost';
import EditPost from './components/EditPost';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import { AuthProviderWrapper } from './context/auth.context';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Protected from './pages/Protected';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <AuthProviderWrapper>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<DetailPost />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/post/:id/delete" element={<DeletePost />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route
          path="/protected"
          element={
            <IsPrivate>
              <Protected />
            </IsPrivate>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </AuthProviderWrapper>
  );
}

export default App;
