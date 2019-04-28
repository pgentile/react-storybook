export default function maybePromise(fn) {
  return valueOrPromise => Promise.resolve(valueOrPromise).then(fn);
}
