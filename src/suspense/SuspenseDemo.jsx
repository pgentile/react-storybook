import React, { Suspense } from "react";
import { unstable_createResource as createResource } from "react-cache";

import Spinner from "../Spinner";
import { Object } from "es6-shim";

export default function SuspenseDemo() {
  return (
    <Suspense fallback={<Spinner />}>
      <Hello />
    </Suspense>
  );
}

const headersResource = createResource(() => getHeaders());

function Hello() {
  const headers = headersResource.read();
  const items = Object.keys(headers).map((headerName) => {
    return (
      <li key={headerName}>
        {headerName} = {headers[headerName]}
      </li>
    );
  });
  return <ul>{items}</ul>;
}

async function getHeaders() {
  const response = await fetch("https://httpbin.org/headers");
  const body = await response.json();
  return body.headers;
}
