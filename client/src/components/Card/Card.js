import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Popover } from "antd";

import {
  IMAGE_BASE_URL,
  API_URL,
  API_KEY,
  IMDB_ACTOR_URL,
} from "../../configs";
import classes from "./Card.module.css";

const Cards = (props) => {
  const [bio, setBio] = useState("");
  const [imdbId, setImdbId] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    actor,
    id,
    image,
    castId,
    movieId,
    movieName,
    name,
    characterName,
    title,
    release,
  } = props;
  const POSTER_SIZE = "w154";

  const popupHandler = () => {
    const endpoint = `${API_URL}person/${castId}/?api_key=${API_KEY}&language=en-US`;
    setLoading(true);
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setBio(result.biography);
        setImdbId(result.imdb_id);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

  if (actor) {
    const content = (
      <React.Fragment>
        {!loading ? (
          <React.Fragment key={props.index}>
            <p
              style={{
                color: "black",
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {name}
            </p>
            <p
              style={{
                color: "black",
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {bio}
            </p>
            <p style={{ textAlign: "center" }}>
              <a
                rel="noopener noreferrer"
                href={`${IMDB_ACTOR_URL}${imdbId}`}
                target="_blank"
              >
                Show in IMDB
              </a>
            </p>{" "}
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
    return (
      <Col lg={6} md={8} xs={24}>
        <Popover
          content={content}
          title={``}
          placement="bottom"
          trigger="click"
          style={{ width: "30px" }}
        >
          <div style={{ position: "relative" }} className={classes.Container}>
            <li style={{ listStyle: "none" }}>
              <img
                className={classes.Image}
                alt={characterName}
                src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
              />
            </li>
            <li className={classes.Middle} onClick={popupHandler}>
              <div className={classes.Text}>Show Bio</div>
            </li>
            <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
              {characterName}
            </h3>
          </div>
        </Popover>
      </Col>
    );
  } else {
    return (
      <Col key={id} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }} className={classes.Container}>
          <li style={{ listStyle: "none" }}>
            <Link to={`/movie/${movieId}`}>
              <img
                style={{
                  width: "100%",
                  height: "320px",
                  border: "3px solid black",
                  borderRadius: "5px",
                }}
                alt={movieName}
                src={image}
                className={classes.Image}
              />
            </Link>

            <h3
              style={{
                color: "black",
                marginLeft: "2px",
                fontFamily: "verdana, Arial",
                fontWeight: "bold",
                fontSize: "120%",
              }}
            >
              {title}
            </h3>
          </li>
          <h4
            style={{
              color: "black",
              marginLeft: "2px",
              fontFamily: "verdana, Arial",
              fontSize: "110%",
            }}
          >
            {release.substring(0, 4)}
          </h4>
        </div>
      </Col>
    );
  }
};

export default Cards;
