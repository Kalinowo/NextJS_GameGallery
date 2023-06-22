import { useState, useEffect } from "react";
import Feed from "./components/Feed";
import Gallery from "./components/Gallery";
import axios from "axios";
import prisma from "@/app/libs/prismadb";

interface photo {
  createdAt: String;
  id: React.Key;
  image: string;
  userId: String;
  blurHash: string;
}

function getPhoto() {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function Home(props: any) {
  const photos = await getPhoto();

  return (
    <>
      <Feed />
      <Gallery photos={photos} />
    </>
  );
}
