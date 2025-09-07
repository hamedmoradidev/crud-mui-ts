export const fetchUserByUserId = async (userId: number | null) => {
  if (!userId) return null;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
};

export const fetchPostByPostId = async (postId: number | null) => {
  if (!postId) return null;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );
  if (!response.ok) throw new Error("Failed to fetch post");
  return response.json();
};

export const AuthorsFetch = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch authors");
  return res.json();
};

export const addPostfetch = async (post: any) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!res.ok) throw new Error("Failed to add post");
  return res.json();
};
