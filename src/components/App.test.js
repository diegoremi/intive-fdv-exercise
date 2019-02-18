import "jest-dom/extend-expect";
import React from "react";
import { render, cleanup } from "react-testing-library";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import appReducer from "../reducers/app";

describe("App", () => {
  afterEach(cleanup);

  it("renders", () => {
    const getPlayersSpy = jest.fn(() => Promise.resolve(true));
    const store = createStore(appReducer, applyMiddleware(thunk));
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <App getAllPlayers={getPlayersSpy} />
      </Provider>
    );

    expect(getByLabelText("Name")).not.toBeNull();
    expect(getByText("No players found")).not.toBeNull();
    expect(getPlayersSpy).toHaveBeenCalled();
  });

  it("shows error", async () => {
    const getPlayersSpy = jest.fn(() => Promise.reject(new Error("Error")));
    const store = createStore(appReducer, applyMiddleware(thunk));
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <App getAllPlayers={getPlayersSpy} />
      </Provider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(getByLabelText("Name")).not.toBeNull();
    expect(getByText("No players found")).not.toBeNull();
    expect(getByText("Error")).not.toBeNull();
  });
});
