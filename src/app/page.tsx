import Image from "next/image";
import styles from "./page.module.css";
import Todo from "./todo";
import ToDoList from "./todoList";

export default async function Home() {
  console.log("server component");
  const test = "test props";
  return (
    <main className={styles.main}>
      <Todo>
        <ToDoList />
      </Todo>
    </main>
  );
}
