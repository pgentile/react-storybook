export default function minDelay(delay, promise) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      promise.then(result => resolve(result));
    }, delay);

    promise.catch(e => {
      clearTimeout(timeout);
      reject(e);
    });
  });
}
