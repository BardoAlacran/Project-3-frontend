function AllPosts({ user, body, date, level, theme }) {
  return (
    <article>
      <h2>{user.name}</h2>
      <div>
        <p>{date}</p>
      </div>
      <div>
        <p>{body}</p>
      </div>
      <div>
        <p>{level}</p>
        <p>{theme}</p>
      </div>
    </article>
  );
}

export default AllPosts;
