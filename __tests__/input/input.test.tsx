import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "@components";

describe("Input", () => {
	it("renders without crashing", () => {
		render(
			<Input name="input-name" label="input-label" placeholder="Sample Input" />
		);

		const value = screen.getByPlaceholderText("Sample Input");
		expect(value).toBeInTheDocument();
	});
});
