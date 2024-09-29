"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

const NewPost = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: { title: string; content: string }) => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to add post");
      }

      router.push("/posts");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen p-8 ">
      <Card className="max-w-lg w-full p-8 shadow-lg auth-form bg-black-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create a New Post
          </CardTitle>
          <CardDescription className="text-gray-200">
            Fill out the form below to add a new post
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-300"
              >
                Title
              </label>
              <Input
                id="title"
                type="text"
                placeholder="Enter your post title"
                {...register("title")}
                className={`w-full "w-full mb-4 p-2 bg-white  text-black-100 ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Content Textarea */}
            <div className="space-y-2">
              <label
                htmlFor="content"
                className="text-sm font-medium text-gray-300"
              >
                Content
              </label>
              <Textarea
                id="content"
                placeholder="Write the content for your post"
                {...register("content")}
                className={`w-full "w-full mb-4 p-2 bg-white  text-black-100 resize-none  ${
                  errors.content ? "border-red-500" : ""
                }`}
                rows={6}
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full form-btn"
              disabled={loading}
            >
              {loading ? "Adding Post..." : "Add Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default NewPost;
