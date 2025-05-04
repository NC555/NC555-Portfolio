"use client";

import React, { useState } from "react";
import { BlogPost, BlogListProps, PostData } from "@/types/post";
import { PostEditor } from "@/components/admin/blog/post-editor";

export default function BlogPostsList({ initialPosts }: BlogListProps) {
  // Accept initialPosts prop
  // Use state to manage the data of the post being edited, or null for list view
  const [editingPostData, setEditingPostData] = useState<PostData | null>(null);
  // Initialize posts state with the prop data
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  const handleCreateNew = () => {
    setEditingPostData({
      title: "",
      publishedAt: new Date().toISOString().split("T")[0], // Default to current date YYYY-MM-DD
      category: "",
      tags: [],
      summary: "",
      banner: "",
      alt: "",
      mathjax: false,
      content: "",
      // slug is optional in PostData and will be generated on save for new posts
    });
  };

  const handleEditPost = (slug: string) => {
    // Find the BlogPost data and transform it to PostData
    const postToEdit = posts.find((post) => post.slug === slug);
    if (postToEdit) {
      setEditingPostData({
        title: postToEdit.metadata.title,
        publishedAt: postToEdit.metadata.publishedAt,
        category: postToEdit.metadata.category || "", // category is required in PostData

        tags: Array.isArray((postToEdit.metadata as any).tags)
          ? (postToEdit.metadata as any).tags
          : [],
        summary: postToEdit.metadata.summary,
        banner: postToEdit.metadata.banner,
        alt: postToEdit.metadata.alt,
        mathjax: (postToEdit.metadata as any).mathjax === true, // Ensure boolean type
        content: postToEdit.content,
        slug: postToEdit.slug, // Include slug for editing existing posts
      });
    } else {
      console.error("Post not found for editing:", slug);
      // Optionally show an error message to the user
    }
  };

  const handleSavePost = async (data: PostData) => {
    // Make the function async
    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save post via API");
      }

      const result = await response.json();
      // Update the posts list to reflect the saved post
      if (data.slug) {
        // Updating an existing post
        setPosts(
          posts.map((post) =>
            post.slug === data.slug
              ? {
                  ...post,
                  metadata: {
                    ...post.metadata,
                    title: data.title,
                    publishedAt: data.publishedAt,
                    category: data.category,
                    summary: data.summary,
                    banner: data.banner,
                    alt: data.alt,
                  },
                  content: data.content,
                }
              : post
          )
        );
      } else {
        // Adding a new post
        setPosts([
          ...posts,
          {
            slug: result.slug,
            metadata: {
              title: data.title,
              publishedAt: data.publishedAt,
              category: data.category,
              summary: data.summary,
              banner: data.banner,
              alt: data.alt,
              tags: data.tags, // Include tags
              mathjax: data.mathjax, // Include mathjax
            },
            tweetIds: [], // Assuming tweetIds are extracted during the get process, not created here
            content: data.content,
          },
        ]);
      }
      setEditingPostData(null);
    } catch (error: any) {
      console.error("Error saving post:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingPostData(null);
  };

  if (editingPostData !== null) {
    return (
      <PostEditor
        initialData={editingPostData}
        onSave={handleSavePost}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Blog</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCreateNew}
        >
          Create New Post
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md h-[720px]">
        <h2 className="text-xl font-semibold mb-4">Posts List</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600">No blog posts found.</p>
        ) : (
          <ul className="h-[90%] overflow-y-auto">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="border-b border-gray-200 py-2 flex justify-between items-center pie-25"
              >
                <div>
                  <h3 className="text-xl font-medium">{post.metadata.title}</h3>
                  <p className="text-gray-600 text-sm">
                    Category: {post.metadata.category} | Published:{" "}
                    {new Date(post.metadata.publishedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex">
                  <button
                    className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                    onClick={() => handleEditPost(post.slug)}
                  >
                    Edit
                  </button>
                  <button className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
