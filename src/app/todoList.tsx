async function getData(): Promise<Todo[]> {
  console.log("getData");
  const res = await fetch("http://localhost:9500/posts", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export default async function ToDoList() {
  const data = await getData();
  console.log("where is?", data);
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
