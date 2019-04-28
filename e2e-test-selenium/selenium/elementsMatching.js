import maybePromise from "./maybePromise";

export default function elementsMatching(predicate) {
  return maybePromise(elements => {
    const initialPromise = Promise.resolve([]);

    return elements.reduce((promise, element, index) => {
      return promise.then(async matchedElements => {
        if (await predicate(element, index)) {
          return [...matchedElements, element];
        }
        return matchedElements;
      });
    }, initialPromise);
  });
}
