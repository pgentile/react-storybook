function applyOnFirstMatchingElement(matcher, action) {
  return elementsOrPromise => {
    return Promise.resolve(elementsOrPromise).then(elements => {
      const chainPromise = elements.reduce((promise, element) => {
        return promise.then(async previousResult => {
          if (previousResult) {
            return true;
          }

          const newResult = await matcher(element);
          if (newResult) {
            await action(element);
          }
          return newResult;
        });
      }, Promise.resolve(false));

      return chainPromise.then(result => {
        if (!result) {
          throw new Error("No element matched the predicate, action never applied");
        }
      });
    });
  };
}

module.exports = applyOnFirstMatchingElement;
