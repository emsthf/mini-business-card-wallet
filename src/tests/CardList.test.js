import React from "react";
import CardList from "../routes/CardList";
import { render, screen } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router-dom";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe("CardList test", () => {
  // it("exist th", () => {
  // render(<CardList />);
  // const position = screen.getByText("Position");
  // const name = screen.getByText("Name");
  // const phoneNumber = screen.getByText("Phone Number");
  // const email = screen.getByText("Email");

  // expect(position).toBeInTheDocument();
  //   expect(mockedNavigator).toHaveBeenCalled();
  // expect(name).toBeInTheDocument();
  // expect(phoneNumber).toBeInTheDocument();
  // expect(email).toBeInTheDocument();

  // expect(name.innerHTML).toEqual("Name");
  // });
  // 🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔
  it("match params", () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
      useParams: () => ({
        cardId: "card-id1",
      }),
      useMatch: () => ({ url: "/cardList/card-id" }),
    }));
  });

  it("useMatch", () => {
    const renderWithRouter = ({ children }) =>
      render(
        <MemoryRouter initialEntries={["cardList/1"]}>
          <Route path="cardList/:cardId">{children}</Route>
        </MemoryRouter>
      );
  });
});
