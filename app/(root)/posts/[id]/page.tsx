"use client";

import requireAuth from "@/lib/requireAuth";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostDetails = () => {
  const router = useRouter();
  const { id } = useParams(); // Get post id from route
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (id) {
        try {
          const res = await fetch(`http://localhost:3001/posts/${id}`);
          const data = await res.json();
          setPost(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching post details:", error);
          setLoading(false);
        }
      }
    };

    fetchPostDetails();
  }, [id]);

  // Loading state with Skeleton
  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center">
        <Card className="max-w-xl w-full p-6">
          <Skeleton className="h-8 w-3/4 mb-6" />
          <Skeleton className="h-5 w-full mb-4" />
          <Skeleton className="h-5 w-5/6 mb-4" />
          <Skeleton className="h-5 w-4/6" />
        </Card>
      </div>
    );
  }

  if (!post) {
    return <div className="p-8">Post not found.</div>;
  }

  return (
    <div className="p-8 flex flex-col items-center">
      <Card className="max-w-2xl w-full md:px-8 md:my-8 px-3 py-6  shadow-lg bg-black-300">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 text-lg leading-relaxed text-gray-400">
          <p>{post.content}</p>
        </CardContent>
        <Button
          onClick={() => router.push("/posts")}
          className="bg-gradient hover:bg-blue-500 rounded-2xl px-4 py-2 mt-6 ml-4"
        >
          Go back to posts
        </Button>
      </Card>
    </div>
  );
};

export default requireAuth(PostDetails);
