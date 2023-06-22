import Feed from "./components/Feed";
import Gallery from "./components/Gallery";
import prisma from "@/app/libs/prismadb";

interface photo {
  createdAt: String;
  id: React.Key;
  image: string;
  userId: String;
  blurHash: string;
}

async function getPhoto() {
  const res = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return res;
}

export default async function Home() {
  const photos = await getPhoto();

  return (
    <>
      <Feed />
      <Gallery photos={photos} />
    </>
  );
}
