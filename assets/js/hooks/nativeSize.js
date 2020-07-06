import { useState, useRef, useEffect } from "react";

function get(element, hProp, wProp) {
  return {
    width: element[wProp],
    height: element[hProp],
  };
}

// Accept SRC argument as a method to re-trigger effect
function useNativeSize(src) {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  useEffect(() => {
    const { current: element } = ref;
    if (!element) {
      return;
    }

    const isVideo = element.tagName === "VIDEO";
    const hProp = isVideo ? "videoHeight" : "naturalHeight";
    const wProp = isVideo ? "videoWidth" : "naturalWidth";
    const event = isVideo ? "loadedmetadata" : "load";

    const { width, height } = get(element, hProp, wProp);
    if (width && height) {
      setDimensions({ width, height });
      return;
    }

    function _listen() {
      const { width, height } = get(element, hProp, wProp);
      if (width && height) {
        setDimensions({ width, height });
        element.removeEventListener(event, _listen);
      }
    }
    element.addEventListener(event, _listen);
    return () => element.removeEventListener(event, _listen);
  }, [src]);

  return [ref, dimensions];
}

export default useNativeSize;
