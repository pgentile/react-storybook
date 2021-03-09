export default async function animate(duration: number, callback: (progress: number) => void): Promise<void> {
  return new Promise((resolve) => {
    let startTime: number | null = null;

    const step = (timestamp: number) => {
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
