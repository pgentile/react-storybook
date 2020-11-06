import { useState } from "react";

let count = 0;

export default function useGeneratedFieldId(id) {
  const [generatedId] = useState(() => `form-field-${count++}`);
  return id || generatedId;
}
