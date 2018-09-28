function elementsMatching(predicate) {
  return elementsOrPromise => {
    return Promise.resolve(elementsOrPromise).then(elements => {
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
  };
}

module.exports = elementsMatching;
