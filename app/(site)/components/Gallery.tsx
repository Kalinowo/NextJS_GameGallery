import { useState, useEffect } from "react";
import axios from "axios";

import BlurLazyLoading from "./BlurLazyLoading";

interface photo {
  createdAt: String;
  id: React.Key;
  image: string;
  userId: String;
  blurHash: string;
}

interface GalleryProps {
  forceRefresh: number;
}

export default function Gallery(props: GalleryProps) {
  const { forceRefresh } = props;
  const [photos, setPhotos] = useState<photo[]>([]);

  const options = {
    headers: { "content-type": "utf-8" },
  };

  useEffect(() => {
    axios.get("/api/image/get", options).then((res) => {
      setPhotos(res.data.reverse());
    });
  }, [forceRefresh]);

  return (
    <div className="flex w-full h-full flex-wrap my-5 gap-1">
      {photos.map((photo, index) => (
        <BlurLazyLoading key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
