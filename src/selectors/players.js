import { createSelector } from "reselect";
import moment from "moment";

export const playerAge = player =>
  moment().diff(moment(player.dateOfBirth), "year");

export const playersWithAgeSelector = createSelector(
  state => state.players,
  players =>
    players.map(player => ({
      ...player,
      age: playerAge(player)
    }))
);

export const filteredPlayersSelector = createSelector(
  playersWithAgeSelector,
  state => state.search.name,
  state => state.search.position,
  state => state.search.age,
  (players, name, position, age) => {
    let result = players;

    if (name) {
      result = result.filter(p => p.name.includes(name));
    }

    if (position) {
      result = result.filter(p => p.position.includes(position));
    }

    if (age) {
      result = result.filter(p => p.age === age);
    }

    return result.toArray();
  }
);
