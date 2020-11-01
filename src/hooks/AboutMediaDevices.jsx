import useMediaDevices from "react-use/lib/useMediaDevices";

import "./AboutMediaDevices.scss";

export default function AboutMediaDevices() {
  const mediaDevices = useMediaDevices();

  return <pre>{JSON.stringify(mediaDevices, null, 2)}</pre>;
}
