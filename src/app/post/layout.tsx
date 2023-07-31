"use client";

import React from "react";

type Props = {
  children: React.ReactNode | Promise<any>;
};

export default function PostLayout({ children }: Props) {
  console.log("post layout");
  return (
    <div style={{ border: "1px solid blue", padding: "1em" }}>{children}</div>
  );
}
