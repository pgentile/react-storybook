import minDelay from "./minDelay";

jest.useFakeTimers();

describe("Min delay", () => {
  test("Success", async () => {
    const result = {};
    const promise = Promise.resolve(result);

    const delayedPromise = minDelay(1000, promise);

    jest.runAllTimers();

    const delayedResult = await delayedPromise;
    expect(delayedResult).toBe(result);
  });

  test("Failure", async () => {
    const error = new Error("Failure");
    const promise = Promise.reject(error);

    const delayedPromise = minDelay(1000, promise);
    await expect(delayedPromise).rejects.toBe(error);
  });
});
