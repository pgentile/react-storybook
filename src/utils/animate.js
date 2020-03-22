export default async function animate(duration, callback) {
  return new Promise((resolve) => {
    let startTime = null;

    const step = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const maxProgress = 1.0;
      const progress = Math.min((timestamp - startTime) / duration, maxProgress);
      callback(progress);

      if (progress < maxProgress) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
}
