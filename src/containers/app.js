import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import App from "../components/App";
import { getAllPlayers } from "../actions/players";

export default connect(
  null,
  dispatch => bindActionCreators({ getAllPlayers }, dispatch)
)(App);
