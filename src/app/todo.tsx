"use client";

import { FormEvent, useState, ReactElement, ReactNode } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode | Promise<ReactElement>;
};

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

export default function Todo({ children }: Props) {
  const [input, setInput] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
    const response = await post({
      userId: 1,
      title: input,
      completed: false,
    });
    console.log(response);
    router.refresh();
  };
  console.log("use client test$$");
  return (
    <div className="searchClient">
      <form onSubmit={handleSubmit}>
        <h2>입력해봐</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="생각나는 거 아무거나"
        />
        <button type="submit">추가</button>
      </form>
      {children}
    </div>
  );
}
