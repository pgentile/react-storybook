import sleep from "./sleep";

jest.useFakeTimers();

test("sleep", async () => {
  const sleepPromise = sleep(1000);

  expect(sleepPromise).toBeInstanceOf(Promise);

  jest.runAllTimers();

  const result = await sleepPromise;
  expect(result).toBeUndefined();
});
