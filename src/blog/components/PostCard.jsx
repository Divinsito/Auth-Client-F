// src/blog/components/PostCard.jsx
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.id}`}
      className="block border p-4 rounded-xl shadow hover:shadow-lg bg-white dark:bg-gray-800 transition transform hover:-translate-y-0.5"
    >
      <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
        {post.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {post.body.substring(0, 100)}...
      </p>
      <span className="mt-3 block text-xs text-blue-500 hover:text-blue-700 font-medium">Leer más →</span>
    </Link>
  );
}