import React, { useState, useMemo } from "react";
import md5 from "md5";

import "./ColorFromString.scss";

// See http://www.cse.yorku.ca/~oz/hash.html
// Algorithm : sdbm
function hashString(str) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = hash * 65599 + str.charCodeAt(i);
    hash &= hash;
  }

  return hash;
}

function getHueForString(str) {
  return hashString(md5(str));
}

export default function ColorFromString() {
  const data = ["host1", "host2", "host3", "host2", "vancouver", "host10"];

  const [name, setName] = useState("");

  const hash = useMemo(() => {
    return getHueForString(name);
  }, [name]);

  const hue = useMemo(() => {
    return hash % 360;
  }, [hash]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="color-from-string">
      <form>
        <fieldset>
          <legend>Paramètres</legend>
          <div>
            <p>
              <label htmlFor="name">Name:</label>
            </p>
            <input id="name" value={name} onChange={handleNameChange} autoComplete="off" />
          </div>
        </fieldset>
      </form>
      <hr />
      <p>
        <b>Name:</b> {name}
      </p>
      <p>
        <b>Hash code:</b> {hash}
      </p>
      <p>
        <b>Hue:</b> {hue}
      </p>
      <div>
        <span className="color-from-string__hue">
          <span
            className="color-from-string__hue-color"
            style={{
              backgroundColor: `hsl(${hue}deg, 70%, 50%)`,
            }}
          />
        </span>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Host</th>
          </tr>
        </thead>
        <tbody>
          {data.map((host, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <span
                  style={{
                    padding: "0.2rem 0.5rem",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "3px",
                    backgroundColor: `hsl(${getHueForString(host)}deg, 70%, 50%)`,
                  }}
                >
                  {host}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ColorFromString.propTypes = {};
