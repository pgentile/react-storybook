import React from "react";
import { render } from "@testing-library/react";

import Expandable from "./Expandable";
import sleep from "./utils/sleep";

describe("Montage des Expandable", () => {
  test("Expandable replié", () => {
    const { container } = render(
      <Expandable>
        <p className="expandable-content-test">This is the content to expand.</p>
      </Expandable>
    );

    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector(".expandable__window")).toHaveStyle("height: 0");
  });

  test("Expandable déplié", () => {
    const { container } = render(
      <Expandable expanded>
        <p className="expandable-content-test">This is the content to expand.</p>
      </Expandable>
    );

    expect(container.firstChild).toHaveAttribute("aria-hidden", "false");
    expect(container.querySelector(".expandable__window")).toHaveStyle("height: auto");
  });
});

describe("Pliage / dépliagle / repliage des Expandable", () => {
  test("Dépliage / repliage", async () => {
    const requestAnimationFrameSpy = jest.spyOn(window, "requestAnimationFrame");

    const content = <p className="expandable-content-test">This is the content to expand.</p>;

    let { container, rerender } = render(<Expandable>{content}</Expandable>);

    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector(".expandable__window")).toHaveStyle("height: 0");

    // Dépliage

    rerender(<Expandable expanded>{content}</Expandable>);

    expect(container.firstChild).toHaveAttribute("aria-hidden", "false");

    await waitUntil(150 * 2, () => {
      expect(container.querySelector(".expandable__window")).toHaveStyle("height: auto");
    });

    // Repliage

    rerender(<Expandable>{content}</Expandable>);

    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");

    await waitUntil(150 * 2, () => {
      expect(container.querySelector(".expandable__window")).toHaveStyle("height: 0");
    });

    expect(requestAnimationFrameSpy).toHaveBeenCalled();

    requestAnimationFrameSpy.mockRestore();
  });
});

async function waitUntil(maxDuration, callback) {
  const endTimestamp = Date.now() + maxDuration;

  let exception = new Error("Failed to complete");
  do {
    try {
      callback();

      // Success ! Break the method
      return;
    } catch (e) {
      exception = e;
    }

    await sleep(50);
  } while (Date.now() <= endTimestamp);

  console.error(`Failed to complete in success for ${maxDuration}ms`);
  throw exception;
}
