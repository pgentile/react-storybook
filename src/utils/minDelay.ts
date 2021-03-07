export default function minDelay<T>(delay: number, promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      promise.then((result) => resolve(result));
    }, delay);

    promise.catch((e) => {
      clearTimeout(timeout);
      reject(e);
    });
  });
}
