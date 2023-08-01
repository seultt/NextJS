"use client";

import { FormEvent, useState, ReactElement, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function post(body: any) {
  const res = await fetch("http://localhost:9500/posts", {
    method: "POST",
    body: JSON.stringify({
      ...body,
      createdAt: new Date(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(res);
  if (res.ok) {
    return {
      data: res.json(),
      requestSuccess: res.ok,
    };
  }
}

export default function PostInput() {
  const [postTitle, setPostTitle] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, mutate } = useMutation((newData: any) => post(newData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      router.refresh();
    },
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ userId: userId, title: postTitle, completed: false });
  };
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // setInput("");
  //   const response = await post({
  //     userId: userId,
  //     title: postTitle,
  //     completed: false,
  //   });
  //   if (response?.requestSuccess) {
  //     router.refresh();
  //   }
  // };
  return (
    <div style={{ border: "1px solid green", padding: "1em" }}>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="post title"
          />
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="userId"
          />
          <button type="submit">추가</button>
        </form>
      </section>
    </div>
  );
}
