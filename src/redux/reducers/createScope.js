export default function createScope(scopeExtractor) {
  return selector => {
    const scopedSelector = rootState => {
      const scopedState = scopeExtractor(rootState);
      return selector(scopedState);
    };

    // Access the scoped selector
    scopedSelector.withinScope = selector;

    return scopedSelector;
  };
}
