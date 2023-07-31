"use client";

import { useRouter } from "next/navigation";

async function deletePost(postId: string) {
  const res = await fetch("http://localhost:9500/posts/" + postId, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
}

export default function DeleteButton({ postId }: { postId: string }) {
  const route = useRouter();
  const handleDelete = () => {
    deletePost(postId);
    route.refresh();
  };
  return (
    <button style={{ color: "red", margin: "1em" }} onClick={handleDelete}>
      X
    </button>
  );
}
