import React, { useState } from "react";
import { Typography, Button, Modal } from "antd";
import { VideoCameraFilled } from "@ant-design/icons";
import ReactPlayer from "react-player/youtube";

import "./ImageSection.css";
import { IMDB_URL } from "../../../configs";
const { Title } = Typography;

const ImageSection = (props) => {
  const { genres, imdb, videos } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  let trailers = [];
  if (videos && videos.results) {
    const { results } = videos;
    const t = results.filter(function (el) {
      return (
        el.type === "Trailer" || (el.type === "Teaser" && el.type === "Youtube")
      );
    });
    trailers = t.map(function (el) {
      return `https://www.youtube.com/watch?v=${el["key"]}`;
    });
  }

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
          {imdb ? (
            <Button type="primary">
              <a
                rel="noopener noreferrer"
                href={`${IMDB_URL}${imdb}`}
                target="_blank"
              >
                IMDB
              </a>
            </Button>
          ) : null}
          {trailers && videos && (
            <Button
              type="primary"
              style={{ marginLeft: "20px" }}
              icon={<VideoCameraFilled />}
              onClick={showModal}
            >
              Watch Trailer
            </Button>
          )}

          <Modal
            visible={isModalVisible}
            onCancel={handleCancel}
            closable={false}
            centered
            destroyOnClose
            mask={false}
            footer={null}
            className="ant-modal-body "
          >
            <div className="player-wrapper">
              <ReactPlayer
                url={trailers}
                className="react-player"
                playing
                width="100%"
                height="100%"
                controls={true}
                closable={false}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
