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
  const [state, setState] = useState<any>({
    backgroundPosition: `0% 0%`,
  });
  const options = {
    headers: { "content-type": "utf-8" },
  };

  useEffect(() => {
    axios.get("/api/image/get", options).then((res) => {
      setPhotos(res.data.reverse());
    });
  }, [photos]);

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setState({ backgroundPosition: `${x}% ${y}%` });
  };

  return (
    <div className="flex w-full h-full flex-wrap my-5 gap-1">
      {photos.map((photo, index) => (
        <div className="basis-[100%] md:basis-[calc(50%-2px)] lg:basis-[calc(33%-1.5px)] border-solid border-white border-2 shadow-2xl shadow-black">
          <div
            key={photo.id}
            className="group relative h-0 pb-[55%] bg-no-repeat overflow-hidden"
            style={{ ...state, backgroundImage: `url(${photo.image}` }}
            onMouseMove={(e) => handleMouseMove(e)}
          >
            <img
              src={photo.image}
              className="absolute top-0 w-full h-full group-hover:opacity-0"
              alt={photo.image}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
