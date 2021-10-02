import axios from "../../axios-url";
import React, { useEffect, useState } from "react";
import { Row, Button, Spin } from "antd";
import { BarLoader } from "react-spinners";
import { withRouter } from "react-router";
import { css } from "@emotion/core";

import Comments from "./Comments/Comments";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  COMMENT_SERVER,
} from "../../configs";
import ImageSection from "../HomePage/Sections/ImageSection";
import MovieInfo from "../../components/MovieDetail/MovieInfo";
import Card from "../../components/Card/Card";
import classes from "./MovieDetail.module.css";
import Favourite from "./Favourite/Favourite";
import Like from "./Like/Like";

const loaderCSSForCast = css`
  position: relative;
  left: 530px;
`;

const MovieDetail = (props) => {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(false);
  const [ActorToggle, setActorToggle] = useState(false);
  const movieVariable = {
    movieId: movieId,
  };

  const toggleActorView = () => {
    const endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    setLoadingForCasts(true);
    fetch(endpointForCasts)
      .then((result) => result.json())
      .then((result) => {
        setCasts(result.cast);
        setLoadingForCasts(false);
      });
    setActorToggle(!ActorToggle);
  };

  useEffect(() => {
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&append_to_response=videos&language=en-US`;
    fetchDetail(endpoint);

    axios.post(`${COMMENT_SERVER}/comments`, movieVariable).then((response) => {
      if (response.data.success) {
        setCommentLists(response.data.comments);
      } else {
        alert("Failed to get comments Info");
      }
    });
    // eslint-disable-next-line
  }, []);

  const fetchDetail = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovie(result);
        setLoadingForMovie(false);
      })
      .catch((error) => setLoadingForMovie(true));
  };
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  return (
    <div>
      {!LoadingForMovie ? (
        <React.Fragment>
          <ImageSection
            imdb={Movie.imdb_id}
            release={Movie.release_date}
            genres={Movie.genres}
            tagline={Movie.tagline}
            image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
            videos={Movie.videos}
          />
          <div style={{ width: "85%", margin: "1rem auto" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Favourite
                movieInfo={Movie}
                movieId={movieId}
                userFrom={localStorage.getItem("userId")}
              />
              <Like
                movie
                movieId={movieId}
                userId={localStorage.getItem("userId")}
              />
            </div>
            <MovieInfo movie={Movie} />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
              }}
            >
              <Button className={classes.ShowCastBtn} onClick={toggleActorView}>
                {!ActorToggle ? "Show Casts" : "Hide Casts"}
              </Button>
            </div>{" "}
            {ActorToggle && (
              <Row gutter={[16, 16]}>
                {!LoadingForCasts ? (
                  Casts.map(
                    (cast, index) =>
                      cast.profile_path && (
                        <React.Fragment key={index}>
                          <Card
                            actor
                            index={index}
                            castId={cast.id}
                            name={cast.name}
                            image={cast.profile_path}
                            characterName={cast.character}
                          />
                        </React.Fragment>
                      )
                  )
                ) : (
                  <BarLoader css={loaderCSSForCast} size={30} loading="true" />
                )}
              </Row>
            )}
            <br />
            <Comments
              movieTitle={Movie.original_title}
              CommentLists={CommentLists}
              postId={movieId}
              refreshFunction={updateComment}
            />
          </div>
        </React.Fragment>
      ) : (
        <div style={{ textAlign: "center", marginTop: "230px" }}>
          <Spin tip="Loading..." size="large" loading="true" />
        </div>
      )}
    </div>
  );
};

export default withRouter(MovieDetail);
