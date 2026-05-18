const KEY = "boom-comments";

export function getComments(postId: number) {
  const stored = localStorage.getItem(KEY);

  const data = stored ? JSON.parse(stored) : {};

  return data[postId] || [];
}

export function addComment(postId: number, text: string) {
  const stored = localStorage.getItem(KEY);

  const data = stored ? JSON.parse(stored) : {};

  const newComment = {
    id: Date.now(),
    user: "you",
    text,
  };

  data[postId] = [
    newComment,
    ...(data[postId] || []),
  ];

  localStorage.setItem(KEY, JSON.stringify(data));

  return data[postId];
}