"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface photo {
  createdAt: String;
  id: React.Key;
  image: string;
  userId: String;
}

export default function Gallery() {
  const [photos, setPhotos] = useState<photo[]>([]);
  const options = {
    headers: { "content-type": "utf-8" },
  };

  useEffect(() => {
    axios.get("/api/image/get", options).then((res) => {
      setPhotos(res.data.reverse());
    });
  }, [photos]);

  return (
    <div className="flex w-full h-full flex-wrap mt-5 gap-1">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className="relative w-[32%] border-solid border-white border-2 shadow-2xl shadow-black"
        >
          <div className="relative h-0 pb-[55%] overflow-hidden">
            <img
              src={photo.image}
              className="absolute inset-0 w-full h-full hover:scale-150"
              alt={photo.image}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
