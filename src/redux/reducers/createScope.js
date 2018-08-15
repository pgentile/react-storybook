import { isUndefined } from 'lodash-es';

// Behaviors for undefined scoped state

export function returnDefaultValue(defaultValue) {
  return () => () => defaultValue;
}

export const returnUndefined = returnDefaultValue(undefined);

export function alwaysExecute(selector) {
  return selector;
}


// Scope factory

export default function createScope(scopeExtractor, undefinedStateBehavior = returnUndefined) {
  return selector => {
    const selectFromScopedState = scopedState => {
      if (isUndefined(scopedState)) {
        return undefinedStateBehavior(selector)(scopedState);
      }
      return selector(scopedState);
    };

    const scopedSelector = rootState => {
      const scopedState = scopeExtractor(rootState);
      return selectFromScopedState(scopedState);
    };

    // Access the scoped selector
    scopedSelector.withinScope = selectFromScopedState;

    return scopedSelector;
  };
}
