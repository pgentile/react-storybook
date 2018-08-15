import createScope, {
  returnDefaultValue,
  returnUndefined,
  alwaysExecute,
} from './createScope';


describe('Scoped selectors', () => {

  const rootState = {
    innerState: {
      hello: 'Hello my friend',
    },
  };

  let selector;
  let undefinedBehavior;

  beforeEach(() => {
    selector = jest.fn();
    selector.mockImplementation(scopedState => scopedState.hello);

    undefinedBehavior = jest.fn();
    undefinedBehavior.mockImplementation(() => () => undefined);
  });

  test('Call undefined behavior for undefined scoped state', () => {
    const scope = createScope(state => state.unexistingState, undefinedBehavior);
    const selectHello = scope(selector);

    const result1 = selectHello(rootState);
    expect(result1).toBeUndefined();
    expect(undefinedBehavior).toHaveBeenCalled();
  });

  test('Call selector for defined scoped state', () => {
    const scope = createScope(state => state.innerState, undefinedBehavior);
    const selectHello = scope(selector);

    const result1 = selectHello(rootState);
    expect(result1).toEqual(rootState.innerState.hello);
    expect(undefinedBehavior).not.toHaveBeenCalled();
  });

});


describe('Undefined scoped state behaviors', () => {
  let selector;

  beforeEach(() => {
    selector = jest.fn();
  });

  const selectorArg = 'My arg';

  test('returnDefaultValue should return a default value', () => {
    const defaultValue = 'TOTO';
    const selectedResult = returnDefaultValue(defaultValue)(selector)(selectorArg);

    expect(selectedResult).toBe(defaultValue);
    expect(selector).not.toHaveBeenCalled();
  });

  test('returnUndefined should return undefined', () => {
    const selectedResult = returnUndefined(selector)(selectorArg);

    expect(selectedResult).toBeUndefined();
    expect(selector).not.toHaveBeenCalled();
  });

  test('alwaysExecute should always execute the selector', () => {
    alwaysExecute(selector)(selectorArg);

    expect(selector).toHaveBeenCalledWith(selectorArg);
  });

});
