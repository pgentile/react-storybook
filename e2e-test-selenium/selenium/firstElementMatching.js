import NoMatchError from "./NoMatchError";
import maybePromise from "./maybePromise";

export default function firstElementMatching(predicate) {
  return maybePromise(elements => {
    const initialPromise = Promise.resolve({ matched: false });

    // Chain elements, apply predicate to all elements, and generate a promise for all
    const chainPromise = elements.reduce((promise, element, index) => {
      return promise.then(async previousResult => {
        if (previousResult.matched) {
          return previousResult;
        }

        const matched = await predicate(element, index);
        return { matched, element };
      });
    }, initialPromise);

    // Extract result, and throw exception if element not found
    return chainPromise.then(result => {
      const { matched, element } = result;
      if (!matched) {
        throw new NoMatchError();
      }
      return element;
    });
  });
}
