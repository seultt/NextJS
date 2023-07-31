async function getPostData(postId: string): Promise<any> {
  const res = await fetch("http://localhost:9500/posts/" + postId, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Post({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { postId } = params;
  const post = await getPostData(postId);
  console.log(post);
  return (
    <section>
      <h1>{post.title}</h1>
      <div>{post.userId}</div>
      <div>{post.createdAt}</div>
    </section>
  );
}
