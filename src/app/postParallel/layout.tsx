"use client";

import React from "react";

type Props = {
  children: React.ReactNode | Promise<any>;
};

export default function PostLayout({ children }: Props) {
  return <div style={{ border: "1px solid red" }}>{children}</div>;
}
