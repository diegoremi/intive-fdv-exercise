import { expect as e } from "chai";
import appReducer from "./app";
import { GET_ALL, SEARCH } from "../actions/players";

const defaultSearch = {
  name: "",
  position: "",
  age: 0
};

describe("reducers/app", () => {
  it("initial state", () => {
    let state = appReducer(undefined, { type: "TEST" });

    e(state.players.toArray()).to.have.lengthOf(0);
    e(state.search).to.deep.equal(defaultSearch);
  });
  it("gets players", () => {
    let state = appReducer(undefined, { type: GET_ALL, players: [1, 2, 3] });

    e(state.players.toArray()).to.deep.equal([1, 2, 3]);
  });
  it("searches", () => {
    let state = appReducer(undefined, {
      type: SEARCH,
      name: "name",
      position: "position",
      age: "45"
    });

    e(state.players.toArray()).to.have.lengthOf(0);
    e(state.search).to.deep.equal({
      name: "name",
      position: "position",
      age: 45
    });
  });
});
