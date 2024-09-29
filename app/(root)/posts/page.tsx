"use client";

import requireAuth from "@/lib/requireAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3001/posts");
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="p-6">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Image
            width={28}
            height={28}
            className="size-8 brightness-[3] inset-0 cursor-pointer"
            src="/icons/home.svg"
            alt="home"
            onClick={() => router.push("/")}
          />
          <h1 className="md:text-3xl text-xl font-semibold ">Latest Posts</h1>
        </div>
        <Button
          className="bg-gradient hover:bg-blue-500 rounded-2xl px-4 py-2"
          onClick={() => router.push("/new-post")}
        >
          Add New Post
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="cursor-pointer bg-black-300 hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/posts/${post.id}`)}
          >
            <CardHeader>
              <CardTitle className="text-xl mb-3">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p> {post.content.substring(0, 50)}...</p>
              <p className="mt-4 text-blue-600 cursor-pointer">Read more</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default requireAuth(PostsPage);
