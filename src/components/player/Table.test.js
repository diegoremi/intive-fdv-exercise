import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { shallow } from "enzyme";
import { Table, Alert } from "reactstrap";
import PlayersTable from "./Table";
import PlayerRow from "./Row";

configure({ adapter: new Adapter() });

describe("PlayersTable", () => {
  it("shows players", () => {
    const players = [
      {
        name: "Name 1",
        position: "Position 1",
        nationality: "Nationality 1",
        age: "1"
      },
      {
        name: "Name 2",
        position: "Position 2",
        nationality: "Nationality 2",
        age: "2"
      }
    ];

    const table = shallow(<PlayersTable players={players} />);

    expect(
      table.matchesElement(
        <Table striped style={{ marginTop: "50px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Country</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <PlayerRow player={players[0]} key={0} />
            <PlayerRow player={players[1]} key={1} />
          </tbody>
        </Table>
      )
    ).toEqual(true);
  });

  it("shows alert if there are no players", () => {
    const table = shallow(<PlayersTable players={[]} />);
    expect(
      table.matchesElement(<Alert color="secondary">No players found</Alert>)
    ).toEqual(true);
  });
});
