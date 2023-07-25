import Image from "next/image";
import styles from "./page.module.css";
import PostInput from "./PostInput";
import PostList from "./PostList";

export default async function Home() {
  console.log("server component");
  const test = "test props";
  const user = "";
  return (
    <main className={styles.main}>
      <PostInput>
        <PostList />
      </PostInput>
    </main>
  );
}
