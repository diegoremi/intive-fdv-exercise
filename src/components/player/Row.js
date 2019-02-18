import React from "react";
import PropTypes from "prop-types";

const PlayerRow = ({ player }) => (
  <tr>
    <td>{player.name}</td>
    <td>{player.position}</td>
    <td>{player.nationality}</td>
    <td>{player.age}</td>
  </tr>
);

PlayerRow.propTypes = {
  player: PropTypes.object.isRequired
};

export default PlayerRow;
