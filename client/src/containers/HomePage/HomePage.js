import React, { useEffect, useState, useRef, useCallback } from "react";
import { Typography, Row, Spin } from "antd";

import Logo from "../../assets/images/Logo.png";

import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../../configs";
import ImageSection from "./Sections/ImageSection";
import Card from "../../components/Card/Card";
import SearchBar from "../Searchbar/Searchbar";

const { Title } = Typography;

const HomePage = () => {
  const buttonRef = useRef(null);

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [searching, setSearching] = useState(false);

  const fetchMovies = (url, index) => {
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        setMovies([...Movies, ...result.results]);
        setMainMovieImage(MainMovieImage || result.results[index]);
        setCurrentPage(result.page);
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  const loadMoreItems = () => {
    let url = "";
    url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        setMovies([...Movies, ...result.results]);
        setCurrentPage(result.page);
      })
      .catch((error) => console.log(error));
  };

  const filteredMovieHandler = useCallback((filterMovies) => {
    setSearching(true);
    setMovies(filterMovies.results);
  }, []);

  useEffect(() => {
    const url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    const index = Math.floor(Math.random(0, 1) * 19);
    fetchMovies(url, index);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {Loading ? (
        <div style={{ textAlign: "center", marginTop: "180px" }}>
          <Spin tip="Loading..." size="large" loading="true" />
        </div>
      ) : (
        <div style={{ width: "100%", margin: "0" }}>
          {MainMovieImage && (
            <ImageSection
              genres={MainMovieImage.genres}
              tagline={MainMovieImage.tagline}
              image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
              title={MainMovieImage.original_title}
              text={MainMovieImage.overview}
            />
          )}
          <div style={{ width: "85%", margin: "1rem auto" }}>
            <SearchBar onLoadMovies={filteredMovieHandler} />
            {searching ? (
              <Title
                level={3}
                style={{ textAlign: "center", marginTop: "80px" }}
              >
                {" "}
                Search Result{" "}
              </Title>
            ) : (
              <Title
                level={3}
                style={{ textAlign: "center", marginTop: "80px" }}
              >
                {" "}
                Popular Movies{" "}
              </Title>
            )}

            <hr />
            <Row gutter={[16, 16]}>
              {Movies &&
                Movies.map((movie, index) => (
                  <React.Fragment key={index}>
                    <Card
                      image={
                        movie.poster_path
                          ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                          : Logo
                      }
                      movieId={movie.id}
                      movieName={movie.original_title}
                      title={movie.title}
                      release={movie.release_date}
                    />
                  </React.Fragment>
                ))}
            </Row>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                ref={buttonRef}
                className="loadMore"
                onClick={loadMoreItems}
              >
                See More
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default HomePage;
