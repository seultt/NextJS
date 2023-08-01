"use client";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";

type Post = {
  _id: string;
  userId: number;
  title: string;
  completed: boolean;
};
export default function PostListComponent(props: { data: Post[] }) {
  const router = useRouter();
  return (
    <div>
      <h1>Post Component</h1>
      <ul style={{ border: "1px solid green" }}>
        {props.data.map((item) => (
          <li key={item._id}>
            <span onClick={() => router.push("/post/" + item._id)}>
              <span>{item.title}</span>
              <span> | </span>
              <span>{item.userId}</span>
            </span>
            <DeleteButton postId={item._id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
