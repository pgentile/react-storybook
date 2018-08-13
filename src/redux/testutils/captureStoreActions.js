export default function captureStoreActions() {
  const actions = [];

  // store => next => action
  const middleware = () => next => action => {
    const result = next(action);
    actions.push(action);
    return result;
  };

  middleware.getActions = () => [...actions];
  middleware.clearActions = () => actions.splice(0, actions.length);

  return middleware;
}
