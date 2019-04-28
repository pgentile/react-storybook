import maybePromise from "./maybePromise";

export default function applyOnElements(fn) {
  return maybePromise(elements => {
    const results = elements.map(async (element, index) => {
      return await fn(element, index);
    });
    return Promise.all(results);
  });
}
