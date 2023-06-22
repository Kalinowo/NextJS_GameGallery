import BlurLazyLoading from "./BlurLazyLoading";
import prisma from "@/app/libs/prismadb";

function getPhotos() {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

interface GalleryProps {}

export default async function Gallery(props: GalleryProps) {
  const photos = await getPhotos();

  return (
    <div className="flex w-full h-full flex-wrap my-5 gap-1">
      {photos.map((photo: any, index: any) => (
        <BlurLazyLoading key={photo.blurHash} photo={photo} />
      ))}
    </div>
  );
}
