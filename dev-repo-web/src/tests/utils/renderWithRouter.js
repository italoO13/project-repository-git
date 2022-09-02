import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, act } from "@testing-library/react";
import App from "../../App"

const renderWithRouter = (path) => {
  return (
    act(() => render(<MemoryRouter initialEntries={[path]}>
      <App/>
    </MemoryRouter>)
  ))
}

export default renderWithRouter;