import React, { useEffect, useState } from "react";
import axios from "../../../axios-url";
import { Button } from "antd";
import { useSelector } from "react-redux";

import { FAV_SERVER } from "../../../configs";
import classes from "./Favorite.module.css";
import { withRouter } from "react-router-dom";

const Favorite = (props) => {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;
  const [loading, setLoading] = useState(false);

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  const variables = {
    movieId: movieId,
    userFrom: userFrom,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };
  const user = useSelector((state) => state.user);

  const onClickFavorite = () => {
    if (user.userData) {
      if (Favorited) {
        setLoading(true);
        axios
          .post(`${FAV_SERVER}/removeFromFavorite`, variables, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            if (response.data.success) {
              setFavoriteNumber(FavoriteNumber - 1);
              setFavorited(!Favorited);
              setLoading(false);
            } else {
              setLoading(false);
              alert("Failed to Remove From Favorite");
            }
          });
      } else {
        setLoading(true);
        axios
          .post(`${FAV_SERVER}/addToFavorite`, variables, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            if (response.data.success) {
              setFavoriteNumber(FavoriteNumber + 1);
              setFavorited(!Favorited);
              setLoading(false);
            } else {
              setLoading(false);
              alert("Failed to Add To Favorite");
            }
          });
      }
    } else {
      props.history.push("/login");
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.post(`${FAV_SERVER}/favoriteNumber`, variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.subscribeNumber);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Failed to get Favorite Number");
      }
    });

    axios.post(`${FAV_SERVER}/favorited`, variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.subscribed);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Failed to get Favorite Information");
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Button
        className={classes.FavBtn}
        onClick={onClickFavorite}
        loading={loading}
      >
        {" "}
        {!Favorited ? "Add to Favorite" : "Not Favorite"} {FavoriteNumber}
      </Button>
    </React.Fragment>
  );
};

export default withRouter(Favorite);
