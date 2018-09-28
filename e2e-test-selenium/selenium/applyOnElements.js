function applyOnElements(fn) {
  return elementsOrPromise => {
    return Promise.resolve(elementsOrPromise).then(elements => {
      const results = elements.map(async (element, index) => {
        return await fn(element, index);
      });
      return Promise.all(results);
    });
  };
}

module.exports = applyOnElements;
