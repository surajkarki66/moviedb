import React, { useEffect, useState } from "react";
import { Typography, Popover, Spin } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import axios from "../../axios-url";
import "./Favorite.css";
import { IMAGE_BASE_URL, POSTER_SIZE, FAV_SERVER } from "../../configs";
import Logo from "../../assets/images/Logo.png";
import { Redirect } from "react-router";

const { Title } = Typography;

const FavoritePage = (props) => {
  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(true);
  const variable = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    if (!variable.userFrom) {
      setIsAuth(false);
    }
    fetchFavouredMovie();
    // eslint-disable-next-line
  }, []);

  const fetchFavouredMovie = () => {
    axios
      .post(`${FAV_SERVER}/getFavoritedMovie`, variable, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.success) {
          setFavorites(response.data.favorites);
          setLoading(false);
        } else {
          alert("Failed to get subscription videos");
        }
      });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    axios
      .post(`${FAV_SERVER}/removeFromFavorite`, variables, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.success) {
          fetchFavouredMovie();
        } else {
          alert("Failed to Remove From Favorite");
        }
      });
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div key={index}>
        {favorite.moviePost ? (
          <img
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`}
            alt={favorite.title}
          />
        ) : (
          <Logo />
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td style={{ color: "black" }}>{favorite.movieTitle}</td>
        </Popover>

        <td style={{ color: "black" }}>{favorite.movieRunTime} mins</td>
        <td style={{ color: "black" }}>
          <li
            style={{ listStyle: "none", cursor: "pointer" }}
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            {" "}
            <DeleteFilled />
          </li>
        </td>
      </tr>
    );
  });

  if (!isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> My Favorite Movies </Title>
      <hr />

      {!Loading ? (
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Movie Runtime</th>
              <td style={{ width: "10px" }}></td>
            </tr>
          </thead>
          <tbody>{renderCards}</tbody>
        </table>
      ) : (
        <div style={{ textAlign: "center", marginTop: "150px" }}>
          {" "}
          <Spin size="large" tip="Loading..." />
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
