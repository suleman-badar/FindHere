import { useEffect, useState } from "react";

// Accepts a string or array of image URLs. Returns { loaded, statusMap }
export default function useImagePreloader(srcs) {
  const [loaded, setLoaded] = useState(false);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const urls = Array.isArray(srcs) ? srcs.filter(Boolean) : [srcs].filter(Boolean);
    if (!urls.length) {
      setLoaded(true);
      return;
    }

    let mounted = true;
    let remaining = urls.length;

    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (!mounted) return;
        setStatusMap((m) => ({ ...m, [url]: true }));
        remaining -= 1;
        if (remaining <= 0) setLoaded(true);
      };
      img.onerror = () => {
        if (!mounted) return;
        setStatusMap((m) => ({ ...m, [url]: false }));
        remaining -= 1;
        if (remaining <= 0) setLoaded(true);
      };
    });

    return () => {
      mounted = false;
    };
  }, [srcs]);

  return { loaded, statusMap };
}
