import { Link } from 'react-router-dom';

function AllPosts({ id, user, body, date, level, theme }) {
  const handleOnClick = () => {
    console.log('post id:', id);
  };

  return (
    <article>
      <h2>{user.name}</h2>
      <p>{date}</p>
      <p>{body}</p>
      <p>{level}</p>
      <p>{theme}</p>
      <Link to={`/post/${id}`}>
        <button onClick={handleOnClick}>button</button>
      </Link>
    </article>
  );
}

export default AllPosts;
