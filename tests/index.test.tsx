import React from "react";
import { fireEvent, getByTestId, render, waitFor } from "@testing-library/react";
import { App } from "../src";
import "@testing-library/jest-dom";

describe("Testing the interactions with the server API", () => {
    const fetchMock: jest.Mock = global.fetch = jest.fn()
    let ç: HTMLElement

    beforeEach(() => {
        const { container } = render(<App />);
        ç = container;
        fetchMock.mockClear();
    })

    test("Should take two numbers and returns the sum returned from the server", async () => {
        // GIVEN two input boxes
        const sum1 = getByTestId(ç, "sum1")
        const sum2 = getByTestId(ç, "sum2")

        // AND the server responds with a value that we know
        fetchMock.mockImplementation(() => Promise.resolve({ json: (async () => Promise.resolve({ data: `42` })) }))

        // WHEN we put two numeric values to the boxes
        await fireEvent.change(sum1, { target: { value: "20" } })
        await fireEvent.change(sum2, { target: { value: "22" } })

        // THEN the call is fired to the server with the correct data
        expect(fetchMock)
            .toHaveBeenCalledWith(expect.stringMatching(/add/), expect.anything())

        // AND the result box is filled with the value returned from the server
        await waitFor(() => expect(getByTestId(ç, "sumres")).toHaveTextContent("42"))
    })

    test("Should take two numbers and returns the product returned from the server", async () => {
        // GIVEN two input boxes
        const mul1 = getByTestId(ç, "mul1")
        const mul2 = getByTestId(ç, "mul2")

        // AND the server responds with a value that we know
        fetchMock.mockImplementation(() => Promise.resolve({ json: (async () => Promise.resolve({ data: `42` })) }))

        // WHEN we put two numeric values to the boxes
        await fireEvent.change(mul1, { target: { value: "6" } })
        await fireEvent.change(mul2, { target: { value: "7" } })

        // THEN the call is fired to the server with the correct data
        expect(fetchMock)
            .toHaveBeenCalledWith(expect.stringMatching(/multiply/), expect.anything())

        // AND the result box is filled with the value returned from the server
        await waitFor(() => expect(getByTestId(ç, "product")).toHaveTextContent("42"))
    })
})