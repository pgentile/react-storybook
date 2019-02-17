import React from "react";
import { useMediaDevices } from "react-use";

import "./AboutMediaDevices.scss";

export default function AboutMediaDevices() {
  const mediaDevices = useMediaDevices();

  return <pre>{JSON.stringify(mediaDevices, null, 2)}</pre>;
}
