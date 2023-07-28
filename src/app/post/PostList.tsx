type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};
async function getData(userId: string): Promise<Todo[]> {
  console.log("getData");
  const res = await fetch("http://localhost:9500/posts?userId=" + userId, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export const preload = (userId: string) => {
  void getData(userId);
};

export default async function ToDoList({ userId }: { userId: string }) {
  const data = await getData(userId);
  console.log("where is?", data);
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
