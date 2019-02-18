import { List } from "immutable";
import { GET_ALL, SEARCH } from "../actions/players";

export default (
  state = {
    players: new List(),
    search: {
      name: "",
      position: "",
      age: 0
    }
  },
  action
) => {
  switch (action.type) {
    case GET_ALL:
      return { ...state, players: List(action.players) };
    case SEARCH:
      return {
        ...state,
        search: {
          name: action.name,
          position: action.position,
          age: parseInt(action.age, 10)
        }
      };
    default:
      return state;
  }
};
