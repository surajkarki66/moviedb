import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Typography } from "antd";

import { IMAGE_BASE_URL } from "../../configs";
import classes from "./Card.module.css";

const Cards = (props) => {
  const { Paragraph, Text } = Typography;
  const {
    actor,
    id,
    image,

    movieId,
    movieName,
    name,
    characterName,
    title,
    release,
  } = props;
  const POSTER_SIZE = "w154";

  if (actor) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }} className={classes.Container}>
          <li style={{ listStyle: "none" }}>
            <img
              className={classes.Image}
              alt={characterName}
              src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
            />
          </li>
          <li className={classes.Middle}>
            <div className={classes.Text}>{name}</div>
          </li>
          <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
            {characterName}
          </h3>
        </div>
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

            <Typography type="">
              <Text
                style={{
                  color: "black",
                  marginLeft: "2px",
                  fontSize: "110%",
                  fontWeight: "bold",
                }}
              >
                {title}
              </Text>
            </Typography>
          </li>
          <Typography>
            <Paragraph
              style={{
                fontWeight: "bold",
                marginLeft: "2px",
              }}
            >
              {" "}
              {release && moment(release).format("LL")}
            </Paragraph>
          </Typography>
        </div>
      </Col>
    );
  }
};

export default Cards;
