import React from "react";
import { Descriptions } from "antd";

const MovieInfo = (props) => {
  const { movie } = props;

  return (
    <Descriptions title="MOVIE INFORMATION" bordered style={{textAlign: "center", marginTop: "30px"}}>
      <Descriptions.Item label="TITLE">
        {movie.original_title}
      </Descriptions.Item>
      <Descriptions.Item label="RELEASE DATE">
        {movie.release_date}
      </Descriptions.Item>
      <Descriptions.Item label="REVENUE">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="RUNTIME (MINUTE)">{movie.runtime}</Descriptions.Item>
      <Descriptions.Item label="VOTE AVERAGE">
        {movie.vote_average}
      </Descriptions.Item>
      <Descriptions.Item label="VOTE COUNT">
        {movie.vote_count}
      </Descriptions.Item>
      <Descriptions.Item label="STATUS">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="POPULARITY">
        {movie.popularity}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default MovieInfo;
