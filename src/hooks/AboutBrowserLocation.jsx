import React, { useMemo } from "react";
import useLocation from "react-use/lib/useLocation";

import "./AboutBrowserLocation.scss";

export default function AboutBrowserLocation() {
  const location = useLocation();
  const searchParams = useURLSearchParams();

  const pushParam = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.append("taxi", "therapie");

    const newUrl = location.pathname + "?" + newParams.toString();
    window.history.pushState({}, "Pushed param", newUrl);
  };

  return (
    <div>
      <p>
        <b>Location:</b>
      </p>
      <pre>{JSON.stringify(location, null, 2)}</pre>
      <p>
        <b>Search params:</b>
      </p>
      <pre>{searchParams.toString()}</pre>
      <p>
        <button onClick={pushParam}>Push param</button>
      </p>
    </div>
  );
}

function useURLSearchParams() {
  const location = useLocation();
  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search || "");
  }, [location.search]);

  return searchParams;
}
