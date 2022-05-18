function Home() {
  return (
    <div>
      <h1>Main tracking Page</h1>
      <form method="post" action="/search">
        <label>
          Search <input name="term" type="text" />
        </label>
        <button type="submit">Track</button>
      </form>
    </div>
  );
}

export default Home;
