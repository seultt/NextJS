// import { Suspense } from "react";
import styles from "./page.module.css";
import PostInput from "./PostInput";
import PostListServerComponent from "./PostListSC";
import PostListClientComponent from "./PostListCC";
import Search from "./Search";
interface User {
  userId: String;
  username: String;
  email: String;
  createdAt: string;
}
async function getUserData(userId: String): Promise<User> {
  const res = await fetch("http://localhost:9500/users/" + userId, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function PostPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log("PostPage", searchParams);
  const userId = searchParams.userId as string;
  const user = await getUserData(userId);

  return (
    <main className={styles.main} style={{ border: "1px solid blue" }}>
      <section className={styles.section}>
        <div>{user.userId}</div>
        <div>{user.username}</div>
        <div>{user.email}</div>
      </section>
      <section className={styles.section}>
        <Search />
        <PostListClientComponent />
        <PostListServerComponent userId={userId} />
        {/* <Suspense
          fallback={<div style={{ border: "1px solid blue" }}>Loading..</div>}
        >
        </Suspense> */}
        <PostInput />
      </section>
    </main>
  );
}
