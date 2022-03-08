import { useEffect, useState } from 'react';
import AllPosts from '../components/AllPosts';
import apiService from '../services/api.service';

function Home() {
  const [posts, setPosts] = useState([]);
  // const postsList = () => {
  //   axios
  //     .get(`${API_URL}/`)
  //     .then(response => {
  //       console.log(response.data);
  //       setPosts(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    apiService
      .getAllPosts()
      .then(allposts => {
        console.log(allposts.data);
        setPosts(allposts.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(posts);

  return (
    <div>
      <h1>Home</h1>
      {posts.map(post => {
        return (
          <AllPosts
            key={post._id}
            id={post._id}
            body={post.body}
            user={post.user}
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
