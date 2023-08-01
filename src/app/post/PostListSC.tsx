import Link from "next/link";
import DeleteButton from "./DeleteButton";
import PostListComponent from "./PostListComponent";

type Post = {
  _id: string;
  userId: number;
  title: string;
  completed: boolean;
};

async function getPostList({ userId }: { userId: String }): Promise<any[]> {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  let path = "http://localhost:9500/posts";
  if (userId) {
    path += "?userId=";
    path += userId;
  }
  const res = await fetch(path, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function PostListSC({ userId }: { userId: string }) {
  const data = await getPostList({ userId });
  console.log("Post List SC");
  return (
    <div style={{ border: "1px solid blue", padding: "1em" }}>
      <PostListComponent data={data} />
    </div>
  );
}
