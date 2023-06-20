"use client";
import Image from "next/image";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

interface blurProps {
  photo: photoProps;
}

interface photoProps {
  id?: React.Key;
  image: string;
  blurHash: string;
}

export default function BlurLazyLoading(props: blurProps) {
  const { photo } = props;
  const [state, setState] = useState<any>({
    backgroundPosition: `0% 0%`,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const handleLoaded = () => {
    setLoading(false);
  };

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setState({ backgroundPosition: `${x}% ${y}%` });
  };

  return (
    <>
      <div className="relative basis-[100%] md:basis-[calc(50%-2px)] lg:basis-[calc(33%-1.5px)] border-solid border-white border-2 shadow-2xl shadow-black">
        <div
          className="group relative h-0 pb-[55%] bg-no-repeat overflow-hidden"
          style={{
            ...state,
            backgroundImage: `url(${photo.image}`,
          }}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div
            className="absolute inset-0"
            style={{ display: loading ? "block" : "none" }}
          >
            <Blurhash
              hash={photo.blurHash}
              width="100%"
              height="100%"
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </div>
          <Image
            className="absolute top-0 w-full h-full group-hover:opacity-0"
            src={photo.image}
            alt="screenshot"
            width={1280}
            height={720}
            onLoad={handleLoaded}
          />
        </div>
      </div>
    </>
  );
}
