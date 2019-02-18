const actionPrefix = "player/";

export const PLAYERS_HOST = "https://football-players-b31f2.firebaseio.com";
export const PLAYERS_PATH = "/players.json";

export const GET_ALL = `${actionPrefix}get-all`;
export const getAllPlayers = (
  playersUri = `${PLAYERS_HOST}${PLAYERS_PATH}`
) => async dispatch => {
  const response = await fetch(playersUri);
  if (!response.ok) {
    throw new Error(
      `Could not retrieve players information: ${response.status} ${
        response.statusText
      }`
    );
  }

  const players = await response.json();

  return dispatch({ type: GET_ALL, players });
};

export const SEARCH = `${actionPrefix}search`;
export const search = ({ name, position, age }) => ({
  type: SEARCH,
  name,
  position,
  age
});
