"use client";

import { FormEvent, useState, ReactElement, ReactNode } from "react";
import { useRouter } from "next/navigation";

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
  return res.json();
}

export default function Todo() {
  const [postTitle, setPostTitle] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setInput("");
    const response = await post({
      userId: userId,
      title: postTitle,
      completed: false,
    });
    console.log(response);
    router.refresh();
  };
  console.log("use client test$$");
  return (
    <>
      <div>
        <section>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="userId"
            />
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="post title"
            />
            <button type="submit">추가</button>
          </form>
        </section>
      </div>
    </>
  );
}
