import { useState, useRef, useEffect } from "react";

function useCurrentSize(disable) {
  const [size, setSize] = useState({ width: 0, height: 0, top: 0, left: 0 });
  const ref = useRef(null);
  useEffect(() => {
    if (disable) {
      return;
    }
    function _check() {
      const { current: element } = ref;
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      setSize((state) => {
        for (const [key, value] of Object.entries(state)) {
          if (value !== rect[key]) {
            return {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            };
          }
        }

        return state;
      });
    }
    _check();

    window.addEventListener("resize", _check);
    return () => window.removeEventListener("resize", _check);
  }, [disable]);

  return [ref, size];
}

export default useCurrentSize;
