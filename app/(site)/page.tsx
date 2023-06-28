import Feed from "./components/Feed";
import Gallery from "./components/Gallery";
import prisma from "@/app/libs/prismadb";

export const revalidate = 1;

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
