"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  console.log(userId);
  const [input, setInput] = useState(userId ?? "");
  const handleSubmit = (e) => {
    e.preventDefault();
    let pathname = "/postParallel";
    if (input) {
      pathname += "?userId=";
      pathname += input;
    }
    router.push(pathname);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
