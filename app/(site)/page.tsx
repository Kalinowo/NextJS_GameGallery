"use client";
import { useState, useEffect } from "react";
import Feed from "./components/Feed";
import Gallery from "./components/Gallery";
import axios from "axios";

interface photo {
  createdAt: String;
  id: React.Key;
  image: string;
  userId: String;
  blurHash: string;
}

export default function Home() {
  const [photos, setPhotos] = useState<photo[]>([]);

  const options = {
    headers: { "content-type": "utf-8" },
  };

  useEffect(() => {
    axios.get("/api/image/get", options).then((res) => {
      console.log(res.data);
      console.log("sending get request");
      setPhotos(res.data.reverse());
    });
  }, []);

  console.log(photos);

  return (
    <>
      <Feed setPhotos={setPhotos} />
      <Gallery photos={photos} />
    </>
  );
}
