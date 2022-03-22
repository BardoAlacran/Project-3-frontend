import { useEffect, useState } from 'react';
import AllPosts from '../components/AllPosts';
import apiService from '../services/api.service';

function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState({
    theme: '',
  });
  const handlePost = e => {
    setFilteredPost(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleOnSubmit = async e => {
    e.preventDefault();
    try {
      const filtered = await apiService.filterPosts(filteredPost);
      setPosts(filtered.data);
      setFilteredPost({ theme: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const getposts = async () => {
    try {
      const allPosts = await apiService.getAllPosts();

      setPosts(allPosts.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getposts();
  }, []);
  console.log(posts);
  return (
    <div className="Container">
      <>
        <form className="card" onSubmit={handleOnSubmit}>
          <label>Theme:</label>
          <select type="text" name="theme" value={filteredPost.theme} onChange={handlePost}>
            <option value="Science">Science</option>
            <option value="Anime">Anime</option>
            <option value="Computing">Computing</option>
            <option value="Gardening">Gardening</option>
            <option value="Gaming">Gaming</option>
            <option value="Curiosities">Curiosities</option>
          </select>
          <button className="button" type="submit">
            filter
          </button>
        </form>
      </>
      <div className="buttonContainer">
        <button
          className="button"
          onClick={() => {
            getposts();
          }}
        >
          remove filter
        </button>
      </div>
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
    </div>
  );
}

export default Home;
