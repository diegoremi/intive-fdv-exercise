import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PlayerSearch from "../../components/search/Search";
import { search } from "../../actions/players";

export default connect(
  null,
  dispatch => bindActionCreators({ onSearch: search }, dispatch)
)(PlayerSearch);
