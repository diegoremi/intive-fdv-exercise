import "jest-dom/extend-expect";
import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import { expect as e } from "chai";
import PlayerSearch from "./Search";

// Awaits for the next cycle of the event loop and its corresponding DOM render
const nextLoop = () => new Promise(resolve => setTimeout(resolve, 0));

describe("PlayerSearch", () => {
  afterEach(cleanup);

  it("searches for all fields", async () => {
    const onSearchSpy = jest.fn();

    const { getByLabelText, getByText } = render(
      <PlayerSearch onSearch={onSearchSpy} />
    );

    fireEvent.input(getByLabelText("Name"), {
      target: {
        value: "Name"
      }
    });

    fireEvent.change(getByLabelText("Position"), {
      target: {
        value: "Attacking Midfield"
      }
    });

    fireEvent.input(getByLabelText("Age"), {
      target: {
        value: "50"
      }
    });

    fireEvent.click(getByText("Search"));

    await nextLoop();

    e(onSearchSpy.mock.calls).to.have.lengthOf(1);
    e(onSearchSpy.mock.calls[0][0]).to.deep.equal({
      name: "Name",
      position: "Attacking Midfield",
      age: 50
    });
  });

  it("validates name", async () => {
    const onSearchSpy = jest.fn();
    const { getByLabelText, getByText } = render(
      <PlayerSearch onSearch={onSearchSpy} />
    );

    fireEvent.input(getByLabelText("Name"), {
      target: {
        value: "Name 1234"
      }
    });

    fireEvent.click(getByText("Search"));

    await nextLoop();

    e(onSearchSpy.mock.calls).to.have.lengthOf(0);
    e(getByText("Please write only letters or white spaces")).not.to.equal(
      null
    );
  });
});
