"use client";

import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { Suspense, useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import PostListComponent from "./PostListComponent";
import { useQuery } from "@tanstack/react-query";

type Post = {
  _id: string;
  userId: number;
  title: string;
  completed: boolean;
};

async function getPostData({ userId }: { userId: String }): Promise<any[]> {
  console.log("getPostData");
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

export default function PostListCC() {
  const [posts, setData] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  // const { data: posts, isLoading } = useQuery<Post[]>({
  //   queryKey: ["posts"],
  //   queryFn: () => getPostData({ userId }),
  // });
  console.log(posts);
  useEffect(() => {
    getPostData({ userId })
      .then((result) => {
        setData(result);
      })
      .catch((e) => console.log(e));
  }, [userId]);

  return (
    <>
      <h1>C.C Post</h1>
      <List data={posts} />
    </>
  );
}
function List({
  data,
}: // isLoading,
{
  data: Post[] | undefined;
  // isLoading: boolean;
}) {
  console.log(data);
  // if (isLoading) return <div>...loading</div>;
  if (!data) return <div> noData</div>;
  return (
    <div style={{ border: "1px solid green", padding: "1em" }}>
      <PostListComponent data={data} />
    </div>
  );
}
