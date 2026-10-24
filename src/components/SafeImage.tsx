"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = "/images/placeholders/apparel-placeholder.svg",
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<any>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : (currentSrc || fallbackSrc)}
      alt={alt || "FX Fashion Gallery"}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
