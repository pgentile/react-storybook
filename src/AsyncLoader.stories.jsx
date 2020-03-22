import React from "react";

import AsyncLoader from "./AsyncLoader";
import sleep from "./utils/sleep";

export default {
  title: "AsyncLoader",
  component: AsyncLoader,
};

export const success = () => {
  return <AsyncLoader loader={loader} error={error} />;
};

export const errorStory = () => {
  return <AsyncLoader loader={loaderError} error={error} />;
};

async function loader() {
  await sleep(3000);
  return <p>Mon composant est chargé</p>;
}

async function loaderError() {
  await sleep(2000);
  throw new Error("Demo error");
}

function error(e) {
  return <p style={{ color: "red" }}>Got an error: {`${e}`}</p>;
}
