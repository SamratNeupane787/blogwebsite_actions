"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const handleCreatePost = async () => {
    console.log("post created successfully");
    router.push("/CreatePost");
  };
  let [data, setData] = useState([]);
  const handleGetPost = async () => {
    const getPost = await fetch("/api/blog");
    const res = await getPost.json();

    if (!res) {
      console.log("failed fetching posts");
    } else {
      setData(res);
    }
  };

  useEffect(() => {
    handleGetPost();
  }, []);
  return (
    <main className=" text-center">
      <h1 className=" text-4xl font-bold">Blog site</h1>
      <button
        className=" mt-12 p-2 rounded-full bg-blue-500 "
        onClick={handleCreatePost}
      >
        New Post
      </button>

      <div className="mt-8">
        {data.length > 0 ? (
          data.map((post, index) => (
            <div
              key={index}
              className="text-center bg-blue-200 text-black text-3xl p-4 mb-4 rounded-lg"
            >
              <h1 className="font-bold text-2xl">{post.title}</h1>
              <p className="mt-2">{post.content}</p>
            </div>
          ))
        ) : (
          <p className="text-xl mt-4">No posts available.</p>
        )}
      </div>
    </main>
  );
}
