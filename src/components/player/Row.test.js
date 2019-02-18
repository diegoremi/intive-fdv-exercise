import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { shallow } from "enzyme";
import PlayerRow from "./Row";

configure({ adapter: new Adapter() });

it("PlayerRow", () => {
  const row = shallow(
    <PlayerRow
      player={{
        name: "Name",
        position: "Position",
        nationality: "Nationality",
        age: "25"
      }}
    />
  );

  expect(
    row.matchesElement(
      <tr>
        <td>Name</td>
        <td>Position</td>
        <td>Nationality</td>
        <td>25</td>
      </tr>
    )
  ).toEqual(true);
});
