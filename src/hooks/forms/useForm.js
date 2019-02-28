import { useMemo } from "react";
import noop from "lodash-es";

export default function useForm({ onSubmit = noop } = {}) {
  // const [onSubmitCallbacks, setOnSubmitCallbacks] = useState([]);

  const form = useMemo(() => {
    const submitCallbacks = [];

    const registerOnSubmit = f => {
      console.info("Coucou:", f);
      submitCallbacks.push(f);
    };

    const deregisterOnSubmit = f => {
      console.info("Au revoir:", f);
    };

    const onSubmitCallback = event => {
      submitCallbacks.forEach(f => f());

      onSubmit(event);
    };

    return {
      registerOnSubmit,
      deregisterOnSubmit,
      onSubmit: onSubmitCallback
    };
  }, []);

  return form;
}
