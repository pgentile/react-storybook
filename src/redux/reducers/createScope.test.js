import createScope, { returnDefaultValue, returnUndefined, alwaysExecute } from "./createScope";

describe("Scoped selectors", () => {
  const rootState = {
    innerState: {
      hello: "Hello my friend",
    },
  };

  let selector;
  let undefinedBehavior;

  beforeEach(() => {
    selector = jest.fn();
    selector.mockImplementation((scopedState) => scopedState.hello);

    undefinedBehavior = jest.fn();
    undefinedBehavior.mockImplementation(() => () => undefined);
  });

  test("Call undefined behavior for undefined scoped state", () => {
    const scope = createScope((state) => state.unexistingState, undefinedBehavior);
    const selectHello = scope(selector);

    const result1 = selectHello(rootState);
    expect(result1).toBeUndefined();

    const result2 = selectHello.withinScope(rootState.unexistingState);
    expect(result2).toBeUndefined();

    expect(selector).not.toHaveBeenCalled();
    expect(undefinedBehavior).toHaveBeenNthCalledWith(2, selector);
  });

  test("Call selector for defined scoped state", () => {
    const scope = createScope((state) => state.innerState, undefinedBehavior);
    const selectHello = scope(selector);

    const result1 = selectHello(rootState);
    expect(result1).toEqual(rootState.innerState.hello);
    expect(undefinedBehavior).not.toHaveBeenCalled();

    const result2 = selectHello.withinScope(rootState.innerState);
    expect(result2).toEqual(rootState.innerState.hello);

    expect(selector).toHaveBeenNthCalledWith(2, rootState.innerState);
  });

  test("Call selector with extra arguments", () => {
    const scope = createScope((state) => state.innerState);
    const selectHello = scope(selector);

    const result1 = selectHello(rootState, "arg1", "arg2");
    expect(result1).toEqual(rootState.innerState.hello);
    expect(selector).toHaveBeenCalledWith(rootState.innerState, "arg1", "arg2");

    const result2 = selectHello.withinScope(rootState.innerState, "arg3", "arg4");
    expect(result2).toEqual(rootState.innerState.hello);
    expect(selector).toHaveBeenCalledWith(rootState.innerState, "arg3", "arg4");
  });
});

describe("Undefined scoped state behaviors", () => {
  let selector;

  beforeEach(() => {
    selector = jest.fn();
  });

  const selectorArg = "My arg";

  test("returnDefaultValue should return a default value", () => {
    const defaultValue = "TOTO";
    const selectedResult = returnDefaultValue(defaultValue)(selector)(selectorArg);

    expect(selectedResult).toBe(defaultValue);
    expect(selector).not.toHaveBeenCalled();
  });

  test("returnUndefined should return undefined", () => {
    const selectedResult = returnUndefined(selector)(selectorArg);

    expect(selectedResult).toBeUndefined();
    expect(selector).not.toHaveBeenCalled();
  });

  test("alwaysExecute should always execute the selector", () => {
    alwaysExecute(selector)(selectorArg);

    expect(selector).toHaveBeenCalledWith(selectorArg);
  });
});
