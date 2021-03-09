import animate from "./animate";

test("animate", async () => {
  const callback = jest.fn();
  const animationPromise = animate(100, callback);
  expect(animationPromise).toBeInstanceOf(Promise);

  const result = await animationPromise;
  expect(result).toBeUndefined();

  expect(callback).toHaveBeenCalledWith(0.0);
  expect(callback).toHaveBeenCalledWith(1.0);
});
