import { posts as allPosts } from "./mock-data";

export function getPosts(page: number, limit: number = 2) {
  const start = (page - 1) * limit;
  const end = start + limit;

  const data = allPosts.slice(start, end);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 800); // simulate network delay
  });
}