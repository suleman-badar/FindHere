import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function ImageWithSkeleton({ src, alt = "", sx = {}, imgStyle = {}, onLoad }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      setLoaded(true);
      onLoad && onLoad(true);
      return;
    }
    let mounted = true;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (!mounted) return;
      setLoaded(true);
      onLoad && onLoad(true);
    };
    img.onerror = () => {
      if (!mounted) return;
      setLoaded(true); // still reveal, but could show fallback
      onLoad && onLoad(false);
    };
    return () => {
      mounted = false;
    };
  }, [src, onLoad]);

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative", ...sx }}>
      {!loaded && (
        <Skeleton variant="rectangular" animation={false} sx={{ width: "100%", height: "100%" }} />
      )}
      {loaded && (
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", ...imgStyle }} />
      )}
    </Box>
  );
}
