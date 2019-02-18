import React from "react";
import PropTypes from "prop-types";
import { Table, Alert } from "reactstrap";
import PlayerRow from "./Row";

const PlayersTable = ({ players }) =>
  players && players.length ? (
    <Table striped style={{ marginTop: "50px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Country</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, i) => (
          <PlayerRow player={player} key={i} />
        ))}
      </tbody>
    </Table>
  ) : (
    <Alert style={{ marginTop: "50px" }} color="secondary">
      No players found
    </Alert>
  );

PlayersTable.propTypes = {
  players: PropTypes.array.isRequired
};

export default PlayersTable;
