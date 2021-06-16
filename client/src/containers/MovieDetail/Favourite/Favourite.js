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
        axios
          .post(`${FAV_SERVER}/removeFromFavourite`, variables)
          .then((response) => {
            if (response.data.success) {
              setFavouriteNumber(FavouriteNumber - 1);
              setFavourited(!Favourited);
            } else {
              alert("Failed to Remove From Favourite");
            }
          });
      } else {
        axios
          .post(`${FAV_SERVER}/addToFavourite`, variables)
          .then((response) => {
            if (response.data.success) {
              setFavouriteNumber(FavouriteNumber + 1);
              setFavourited(!Favourited);
            } else {
              alert("Failed to Add To Favourite");
            }
          });
      }
    } else {
      props.history.push("/login");
    }
  };

  useEffect(() => {
    axios.post(`${FAV_SERVER}/favouriteNumber`, variables).then((response) => {
      if (response.data.success) {
        setFavouriteNumber(response.data.subscribeNumber);
      } else {
        alert("Failed to get Favorite Number");
      }
    });

    axios.post(`${FAV_SERVER}/favourited`, variables).then((response) => {
      if (response.data.success) {
        setFavourited(response.data.subcribed);
      } else {
        alert("Failed to get Favorite Information");
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Button className={classes.FavBtn} onClick={onClickFavorite}>
        {" "}
        {!Favourited ? "Add to Favourite" : "Not Favourite"} {FavouriteNumber}
      </Button>
    </React.Fragment>
  );
};

export default withRouter(Favorite);
