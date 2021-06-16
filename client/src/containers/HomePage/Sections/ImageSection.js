import React from "react";
import { Typography } from "antd";

import { IMDB_URL } from "../../../configs";

const { Title } = Typography;

const ImageSection = (props) => {
  const genres = props.genres;
  const imdb_id = props.imdb;
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url('${props.image}'), #1c1c1c`,
        height: "500px",
        backgroundSize: "100%, cover",
        backgroundPosition: "center, center",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem",
          }}
        >
          <Title style={{ color: "white" }} level={2}>
            {" "}
            {props.title}{" "}
          </Title>
          <h4
            style={{
              color: "white",
              textTransform: "uppercase",
              bottom: "10px",
              position: "relative",
            }}
          >
            {props.tagline}
          </h4>
          {genres
            ? genres.map((genre) => (
                <h2
                  key={genre.id}
                  style={{
                    color: "white",
                    bottom: "10px",
                    position: "relative",
                    display: "inline-block",
                    backgroundColor: "black",
                  }}
                >
                  | {genre.name}
                  &nbsp;&nbsp;
                </h2>
              ))
            : null}

          <h2 style={{ color: "aqua" }}>Overview</h2>
          <p style={{ color: "white", fontSize: "1rem", lineHeight: "1.6em" }}>
            {props.text}
          </p>
          {imdb_id ? (
            <button className="imdb-btn">
              <a rel="noopener noreferrer" href={`${IMDB_URL}${imdb_id}`} style={{ color: "black" }} target="_blank">
                IMDB
              </a>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
