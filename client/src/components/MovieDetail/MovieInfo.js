import moment from "moment";
import React from "react";
import { Descriptions } from "antd";

const MovieInfo = (props) => {
  const { movie } = props;

  return (
    <Descriptions
      title="MOVIE INFORMATION"
      bordered
      style={{ textAlign: "center", marginTop: "30px" }}
    >
      <Descriptions.Item label="TITLE">
        <b> {movie.original_title}</b>
      </Descriptions.Item>
      <Descriptions.Item label="RELEASE DATE">
        <b> {movie.release_date && moment(movie.release_date).format("LL")}</b>
      </Descriptions.Item>
      <Descriptions.Item label="PRODUCTION COMPANY">
        <b>{movie.production_companies[0].name}</b>
      </Descriptions.Item>

      <Descriptions.Item label="RUNTIME (MINUTE)">
        <b>{movie.runtime}</b>
      </Descriptions.Item>
      <Descriptions.Item label="VOTE AVERAGE">
        <b> {movie.vote_average}</b>
      </Descriptions.Item>
      <Descriptions.Item label="VOTE COUNT">
        <b> {movie.vote_count}</b>
      </Descriptions.Item>
      <Descriptions.Item label="STATUS">
        <b>{movie.status}</b>
      </Descriptions.Item>
      <Descriptions.Item label="POPULARITY">
        <b> {movie.popularity}</b>
      </Descriptions.Item>
      <Descriptions.Item label="REVENUE">
        <b>{movie.revenue}</b>
      </Descriptions.Item>
      <Descriptions.Item label="LANGUAGES">
        {movie.spoken_languages.map((l) => (
          <b key={l.english_name}>{l.english_name} | </b>
        ))}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default MovieInfo;
