import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Component testing", () => {
  test("App component", () => {
    const { container } = render(<App/>);
    const { firstChild} = container;
    expect(firstChild).toHaveClass("main_page");
  });

  test("UsersTable component", () => {
    const { container } = render(<App/>);
    const { firstChild} = container;
    const { tableComponent } = firstChild;
    expect(tableComponent).toHaveAttribute("url", "http://localhost:8080/users");
  });
});