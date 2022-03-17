import { useEffect, useState } from 'react';
import AllPosts from '../components/AllPosts';
import apiService from '../services/api.service';

function Home() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="Container">
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
