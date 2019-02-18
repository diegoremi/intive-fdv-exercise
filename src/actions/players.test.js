/**
 * @jest-environment node
 */

import fetch from "node-fetch";
import { expect as e } from "chai";
import nock from "nock";
import {
  search,
  getAllPlayers,
  SEARCH,
  GET_ALL,
  PLAYERS_HOST,
  PLAYERS_PATH
} from "./players";

describe("actions/player", () => {
  it("search", () => {
    e(search({ name: "name", position: "position", age: "age" })).to.deep.equal(
      {
        type: SEARCH,
        name: "name",
        position: "position",
        age: "age"
      }
    );
  });

  describe("getAllPlayers", () => {
    const players = [{ name: "name1" }, { name: "name2" }];

    beforeEach(() => {
      global.fetch = fetch;
    });

    it("retrieves players", async () => {
      nock(PLAYERS_HOST)
        .get(PLAYERS_PATH)
        .reply(200, JSON.stringify(players));

      e(await getAllPlayers()(x => x)).to.deep.equal({
        type: GET_ALL,
        players
      });
    });

    it("bad response error", async () => {
      nock(PLAYERS_HOST)
        .get(PLAYERS_PATH)
        .reply(404, "Not Found");

      await expect(
        getAllPlayers()(x => x)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Could not retrieve players information: 404 Not Found"`
      );
    });
  });
});
