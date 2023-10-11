export function searchBar() {
  return (
    <>
      <form action="/search">
        <label for="search">Search</label>
        <input type="text" placeholder="search" id="search"></input>
        <button value="Search" onClick="searchFor()"></button>
      </form>
    </>
  );
}
