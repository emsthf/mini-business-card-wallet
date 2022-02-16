import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "jest-styled-components";
import React from "react";
import AddCard from "../routes/AddCard";

describe("Add Form test", () => {
  beforeEach(() => {});

  it("exist input", () => {
    render(<AddCard />);
    const position = screen.getByPlaceholderText("Position");
    const name = screen.getByPlaceholderText("Name");
    const phoneNumber = screen.getByPlaceholderText("Phone Number");
    const email = screen.getByPlaceholderText("Email");

    expect(position).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(phoneNumber).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    expect(phoneNumber.innerHTML).toEqual("");
  });

  it("button text", () => {
    render(<AddCard />);
    const button = screen.getByText("Add Card");
    expect(button.innerHTML).toEqual("Add Card");
  });

  it("When the button is clicked without entering anything in input", () => {
    const onSubmit = jest.fn();
    const alert = jest.spyOn(window, "alert").mockImplementation();
    const { getByText } = render(<AddCard onSubmit={onSubmit} />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const button = getByText("Add Card");

    fireEvent.click(button);

    // required인 input 칸에 값이 없으므로 0회 호출
    expect(alert).toHaveBeenCalledTimes(0);
  });
});
