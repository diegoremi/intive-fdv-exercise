import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import PlayerSearch from "../containers/player/search";
import PlayersTable from "../containers/player/table";

export default class App extends Component {
  static propTypes = {
    getAllPlayers: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };
  }

  componentDidMount() {
    this.props.getAllPlayers().catch(error => {
      this.setState({ error: error.message });
    });
  }

  render() {
    const { error } = this.state;

    return (
      <div className="app">
        <h3>Football Player Finder</h3>
        {error ? <Alert color="danger">{error}</Alert> : undefined}
        <PlayerSearch />
        <PlayersTable />
      </div>
    );
  }
}
