import { useState, useEffect, Fragment } from "react";

export default function ResizeDetector() {
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    const onWindowResize = () => setResizing(true);

    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  useEffect(() => {
    if (resizing) {
      const handle = setTimeout(() => setResizing(false), 3000);
      return () => clearTimeout(handle);
    }
  }, [resizing]);

  return <Fragment>{resizing ? <b>OUI</b> : "NON"}</Fragment>;
}
