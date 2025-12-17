'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CoverImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

export default function CoverImage({ src, alt, className, width = 1200, height = 600, fill = false }: CoverImageProps) {
  const fallback = '/images/default-blog.svg';
  const [imgSrc, setImgSrc] = useState<string>(src || fallback);

  const handleError = () => {
    if (imgSrc !== fallback) setImgSrc(fallback);
  };

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        onError={handleError}
        className={className}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      className={className}
    />
  );
}
