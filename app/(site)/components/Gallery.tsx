import BlurLazyLoading from "./BlurLazyLoading";

interface GalleryProps {
  photos: any;
}

export default function Gallery(props: GalleryProps) {
  const { photos } = props;

  return (
    <div className="flex w-full h-full flex-wrap my-5 gap-1">
      {photos.map((photo: any, index: any) => (
        <BlurLazyLoading key={photo.blurHash} photo={photo} />
      ))}
    </div>
  );
}
