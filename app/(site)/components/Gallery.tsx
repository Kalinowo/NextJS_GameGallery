"use client";
import { useState, useEffect } from "react";
import BlurLazyLoading from "./BlurLazyLoading";

interface GalleryProps {
  photos: any;
}

export default function Gallery(props: GalleryProps) {
  const { photos } = props;
  const [data, setData] = useState<any>();

  useEffect(() => {
    setData(photos);
  }, []);

  return (
    <div className="flex w-full h-full flex-wrap my-5 gap-1">
      {data &&
        photos.map((photo: any, index: any) => (
          <BlurLazyLoading key={photo.blurHash} photo={photo} />
        ))}
    </div>
  );
}
