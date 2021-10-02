import React, { useEffect, useState, useRef, useCallback } from "react";
import { Typography, Row, Spin, Button, Select } from "antd";

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
  const { Option } = Select;
  const [Movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [MainMovieImage, setMainMovieImage] = useState("");
  const [Loading, setLoading] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [searching, setSearching] = useState(false);

  const fetchMovies = (url, index) => {
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        setMovies(result.results);
        setMainMovieImage(result.results[index]);
        setCurrentPage(result.page);
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  const loadMoreItems = () => {
    let url = "";
    url = `${API_URL}movie/${category}?api_key=${API_KEY}&language=en-US&page=${
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
    const url = `${API_URL}movie/${category}?api_key=${API_KEY}&language=en-US&page=1`;
    const index = Math.floor(Math.random(0, 1) * 19);
    fetchMovies(url, index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <React.Fragment>
      {Loading ? (
        <div style={{ textAlign: "center", marginTop: "220px" }}>
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
                style={{ textAlign: "center", marginTop: "30px" }}
              >
                {" "}
                {category === "latest" && "Latest Movies"}
                {category === "now_playing" && "Now Playing Movies"}
                {category === "popular" && "Popular Movies"}
                {category === "top_rated" && "Top Rated Movies"}
                {category === "upcoming" && "Upcoming Movies"}
              </Title>
            )}
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Select
                labelInValue
                defaultValue={{ value: category }}
                style={{ width: 120 }}
                onChange={(value) => setCategory(value.value)}
                placeholder="Filter movies"
              >
                <Option value="popular">Popular</Option>
                <Option value="latest">Latest</Option>
                <Option value="top_rated">Top rated</Option>
                <Option value="now_playing">Now playing</Option>
                <Option value="upcoming">Upcoming</Option>
              </Select>
            </div>

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
            {Movies && Movies.length !== 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "6px",
                }}
              >
                <Button
                  ref={buttonRef}
                  className="loadMore"
                  onClick={loadMoreItems}
                >
                  See More
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default HomePage;
