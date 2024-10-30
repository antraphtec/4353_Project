import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "./components/NavBar"; // Example of component to test

test("renders the NavBar component", () => {
  render(<NavBar />);
  const navElement = screen.getByText(/Mocked NavBar/i);
  expect(navElement).toBeInTheDocument();
});
