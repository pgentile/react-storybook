import React from "react";

import encryptPayload from "./encryptPayload";

export default {
  title: "Encryption"
};

export const test = () => {
  encryptPayload("This is my data").catch(e => console.error("Failed to encrypt payload: %s", e));
  return <div style={{ color: "red", fontSize: "3em", fontWeight: "bold" }}>Please look at your console</div>;
};
