import React, { useState } from "react";

type ImageWithFallbackProps = {
  src?: string;
  alt?: string;
  className?: string;
  fallbackClassName?: string;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = "Image",
  className,
  fallbackClassName,
}) => {
  const placeholder = "https://placehold.co/300x400/png?text=No+Preview";
  const [imgSrc, setImgSrc] = useState(src || placeholder);
  const [isFallback, setIsFallback] = useState(!src);

  const handleError = () => {
    setImgSrc(placeholder);
    setIsFallback(true);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={isFallback ? fallbackClassName || className : className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;
