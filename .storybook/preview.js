import React, { useEffect } from "react";

import "../src/styles/global.scss";

// Il faut ajouter une variable à l'import pour que la globale
// regeneratorRuntime soit correctement définie
import rr from "regenerator-runtime/runtime";

export const decorators = [
  (Story) => {
    return <div className="rs"><Story /></div>;
  },
];
