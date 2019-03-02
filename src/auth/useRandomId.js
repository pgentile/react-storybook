import { useState } from "react";

let currentId = 1;

export default function useRandomId() {
  const [id] = useState(() => `random-id-${currentId++}`);
  return id;
}
