const NoMatchError = require("./NoMatchError");

function firstElementMatching(predicate) {
  return elementsOrPromise => {
    return Promise.resolve(elementsOrPromise).then(elements => {
      const initialPromise = Promise.resolve({ matched: false });

      // Chain elements and generate a promise for all
      const chainPromise = elements.reduce((promise, element, index) => {
        return promise.then(async previousResult => {
          if (!previousResult.matched) {
            const matched = await predicate(element, index);
            if (matched) {
              return { matched, element };
            }
          }

          return previousResult;
        });
      }, initialPromise);

      // Throw exception if element not found
      return chainPromise.then(result => {
        const { matched, element } = result;
        if (!matched) {
          throw new NoMatchError();
        }
        return element;
      });
    });
  };
}

module.exports = firstElementMatching;
