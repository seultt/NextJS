"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  console.log(userId);
  const [input, setInput] = useState(userId ?? "");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let pathname = "/post";
    if (input) {
      pathname += "?userId=";
      pathname += input;
    }
    router.push(pathname);
  };
  return (
    <div style={{ border: "1px solid green", padding: "1em" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search UserId"
        />
      </form>
    </div>
  );
}
