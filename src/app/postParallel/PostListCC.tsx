"use client";

import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { Suspense, useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";

type Post = {
  _id: string;
  userId: number;
  title: string;
  completed: boolean;
};

async function getPostData({ userId }: { userId: String }): Promise<any[]> {
  console.log("getPostData");
  await new Promise((resolve) => setTimeout(resolve, 5000));
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

export default function ToDoList() {
  const [data, setData] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
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
      <Suspense fallback={<div>loading...</div>}>
        <List data={data} />
      </Suspense>
    </>
  );
}
function List({ data }: { data: any[] }) {
  console.log(data);
  if (!data.length) return <div>no data</div>;
  return (
    <ul style={{ border: "1px solid green" }}>
      {data.map((item) => (
        <li key={item._id}>
          <Link href={"/postParallel/" + item._id}>
            <span>{item.title}</span>
            <span> | </span>
            <span>{item.userId}</span>
          </Link>
          {/* onClick 시 refetch 해주는 prop 을 넘겨줘야함 */}
          <DeleteButton postId={item._id} />
        </li>
      ))}
    </ul>
  );
}
