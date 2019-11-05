import React from "react";
import { render, act } from "@testing-library/react";

import ResizeDetector from "./ResizeDetector";

describe("ResizeDetector", () => {
  it("should say NON by default", async () => {
    const { findByText } = render(<ResizeDetector />);

    const nonElement = await findByText("NON");
    expect(nonElement).not.toBeNull();
  });

  it("should say OUI on window resize", async () => {
    const { findByText } = render(<ResizeDetector />);

    act(() => {
      const resizeEvent = document.createEvent("Event");
      resizeEvent.initEvent("resize", true, true);
      window.dispatchEvent(resizeEvent);
    });

    const ouiElement = await findByText("OUI");
    expect(ouiElement).not.toBeNull();
  });

  it("should say NON on window resize then timeout", async () => {
    jest.useFakeTimers();

    const { findByText } = render(<ResizeDetector />);

    act(() => {
      const resizeEvent = document.createEvent("Event");
      resizeEvent.initEvent("resize", true, true);
      window.dispatchEvent(resizeEvent);
    });

    const ouiElement = await findByText("OUI");
    expect(ouiElement).not.toBeNull();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    const nonElement = await findByText("NON");
    expect(nonElement).not.toBeNull();
  });
});
