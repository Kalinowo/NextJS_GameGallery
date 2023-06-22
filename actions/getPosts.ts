import prisma from "@/app/libs/prismadb";

const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error: any) {
    return [];
  }
};

export default getPosts;
