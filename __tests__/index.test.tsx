import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@pages";

describe("Home", () => {
	it("renders a heading", () => {
		render(<Home />);

		const heading = screen.getByRole("heading", {
			name: /a next\.js boilerplate with typescript, tailwind css and testing suite enabled/i,
		});

		expect(heading).toBeInTheDocument();
	});
});
