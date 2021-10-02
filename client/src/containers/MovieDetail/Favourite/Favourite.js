import React, { useEffect, useState } from "react";
import axios from "../../../axios-url";
import { Button } from "antd";
import { useSelector } from "react-redux";

import { FAV_SERVER } from "../../../configs";
import classes from "./Favourite.module.css";
import { withRouter } from "react-router-dom";

const Favorite = (props) => {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;
  const [loading, setLoading] = useState(false);

  const [FavouriteNumber, setFavouriteNumber] = useState(0);
  const [Favourited, setFavourited] = useState(false);
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
      if (Favourited) {
        setLoading(true);
        axios
          .post(`${FAV_SERVER}/removeFromFavourite`, variables)
          .then((response) => {
            if (response.data.success) {
              setFavouriteNumber(FavouriteNumber - 1);
              setFavourited(!Favourited);
              setLoading(false);
            } else {
              setLoading(false);
              alert("Failed to Remove From Favourite");
            }
          });
      } else {
        setLoading(true);
        axios
          .post(`${FAV_SERVER}/addToFavourite`, variables)
          .then((response) => {
            if (response.data.success) {
              setFavouriteNumber(FavouriteNumber + 1);
              setFavourited(!Favourited);
              setLoading(false);
            } else {
              setLoading(false);
              alert("Failed to Add To Favourite");
            }
          });
      }
    } else {
      props.history.push("/login");
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.post(`${FAV_SERVER}/favouriteNumber`, variables).then((response) => {
      if (response.data.success) {
        setFavouriteNumber(response.data.subscribeNumber);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Failed to get Favorite Number");
      }
    });

    axios.post(`${FAV_SERVER}/favourited`, variables).then((response) => {
      if (response.data.success) {
        setFavourited(response.data.subcribed);
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
        {!Favourited ? "Add to Favourite" : "Not Favourite"} {FavouriteNumber}
      </Button>
    </React.Fragment>
  );
};

export default withRouter(Favorite);
