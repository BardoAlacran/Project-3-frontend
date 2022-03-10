import { Link } from 'react-router-dom';

function AllPosts({ id, user, body, date, level, theme }) {
  return (
    <article className="card">
      <h2>
        <Link to={`/profile/${user._id}`}>
          <b>{user.name}</b>
        </Link>
      </h2>
      <p>{date}</p>
      <div className="featureContainer">
        <p className="feature">{level}</p>
        <p className="feature">{theme}</p>
      </div>
      <Link to={`/post/${id}`}>
        <p>{body}</p>
      </Link>
      <div className="buttonContainer">
        <Link to={`/post/${id}/edit`}>
          <button className="button">Edit</button>
        </Link>
        <Link to={`/post/${id}/delete`}>
          <button className="button">Delete</button>
        </Link>
      </div>
    </article>
  );
}

export default AllPosts;
