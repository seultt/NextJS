import Link from "next/link";
import DeleteButton from "./DeleteButton";

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
    <>
      <h1>S.C Post</h1>
      <ul style={{ border: "1px solid blue" }}>
        {data.map((item) => (
          <li key={item._id}>
            <Link href={"/post/" + item._id}>
              <span>{item.title}</span>
              <span> | </span>
              <span>{item.userId}</span>
            </Link>
            <DeleteButton postId={item._id} />
          </li>
        ))}
      </ul>
    </>
  );
}
