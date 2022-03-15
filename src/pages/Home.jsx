import { useEffect, useState } from 'react';
import AllPosts from '../components/AllPosts';
import apiService from '../services/api.service';

function Home() {
  const [posts, setPosts] = useState([]);
  //const [isFav, setIsFav] = useState([]);
  useEffect(() => {
    apiService
      .getAllPosts()
      .then(allposts => {
        setPosts(allposts.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const handleFav = () => {};
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
            onFav={handleFav}
          />
        );
      })}
    </div>
  );
}

export default Home;
