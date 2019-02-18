import { expect as e } from "chai";
import moment from "moment";
import { List } from "immutable";
import _ from "lodash";
import {
  playerAge,
  playersWithAgeSelector,
  filteredPlayersSelector
} from "./players";
const omitDateOfBirth = e => _.omit(e, "dateOfBirth");

describe("selectors/player", () => {
  it("playerAge", () => {
    e(
      playerAge({
        dateOfBirth: moment()
          .add(-2, "years")
          .format("YYYY-MM-DD")
      })
    ).to.equal(2);
  });

  it("playersWithAgeSelector", () => {
    const players = [
      { dateOfBirth: moment().add(-20, "years") },
      { dateOfBirth: moment().add(-30, "years") }
    ];

    e(
      playersWithAgeSelector({
        players: List(players)
      })
        .map(omitDateOfBirth)
        .toArray()
    ).to.deep.equal([{ age: 20 }, { age: 30 }]);
  });

  describe("filteredPlayersSelector", () => {
    const players = [
      {
        name: "first",
        position: "behind",
        dateOfBirth: moment().add(-10, "years")
      },
      {
        name: "second",
        position: "middle",
        dateOfBirth: moment().add(-20, "years")
      },
      {
        name: "third",
        position: "ahead",
        dateOfBirth: moment().add(-30, "years")
      }
    ];

    it("filters everthing", () => {
      e(
        filteredPlayersSelector({
          players: List(players),
          search: { name: "name", position: "position", age: 1 }
        }).map(omitDateOfBirth)
      ).to.have.lengthOf(0);
    });

    it("filters name", () => {
      e(
        filteredPlayersSelector({
          players: List(players),
          search: { name: "s", position: "", age: 0 }
        }).map(omitDateOfBirth)
      )
        .to.have.lengthOf(2)
        .to.deep.include({
          name: "first",
          position: "behind",
          age: 10
        })
        .and.to.deep.include({
          name: "second",
          position: "middle",
          age: 20
        });
    });

    it("filters position", () => {
      e(
        filteredPlayersSelector({
          players: List(players),
          search: { name: "", position: "behind", age: 0 }
        }).map(omitDateOfBirth)
      )
        .to.have.lengthOf(1)
        .and.to.deep.include({
          name: "first",
          position: "behind",
          age: 10
        });
    });

    it("filters age", () => {
      e(
        filteredPlayersSelector({
          players: List(players),
          search: { name: "", position: "", age: 10 }
        }).map(omitDateOfBirth)
      )
        .to.have.lengthOf(1)
        .and.to.deep.include({
          name: "first",
          position: "behind",
          age: 10
        });
    });

    it("filters all", () => {
      e(
        filteredPlayersSelector({
          players: List(players),
          search: { name: "first", position: "behind", age: 10 }
        }).map(omitDateOfBirth)
      )
        .to.have.lengthOf(1)
        .and.to.deep.include({
          name: "first",
          position: "behind",
          age: 10
        });
    });
  });
});
