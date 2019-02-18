import { connect } from "react-redux";
import PlayersTable from "../../components/player/Table";
import { filteredPlayersSelector } from "../../selectors/players";

export default connect(state => ({
  players: filteredPlayersSelector(state)
}))(PlayersTable);
