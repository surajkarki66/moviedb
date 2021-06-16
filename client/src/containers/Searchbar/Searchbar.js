import React, { useState, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";

import { API_KEY, API_URL } from "../../configs";

const SearchBar = React.memo((props) => {
  const { onLoadMovies } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? false : true;
        if (query) {
          const url = `${API_URL}search/movie?api_key=${API_KEY}&query=${enteredFilter}`;
          fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
              onLoadMovies(responseData);
            })
            .catch((error) => setLoading(false));
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadMovies, inputRef]);

  return (
    <div className="search-bar">
    <h3 style={{textTransform: 'uppercase'}}>Search For Movies</h3>
      <form onSubmit={submitHandler}>
        <input
          className="searchTerm"
          ref={inputRef}
          type="text"
          placeholder="Search Movies"
          value={enteredFilter}
          onChange={(event) => setEnteredFilter(event.target.value)}
          size="50"
        />
        {loading && <ClipLoader size={50} loading />}
      </form>
    </div>
  );
});

export default SearchBar;
