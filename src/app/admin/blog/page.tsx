import React from "react";
import BlogPostsList from "@/components/admin/blog/posts-list"; 
import { getBlogPosts } from "@/lib/db/v1/post"; 
import { BlogPost} from "@/types/post"; 

// Make the page component async to fetch data on the server
export default async function AdminBlogPage() {
  // Fetch blog posts on the server
  const initialPosts: BlogPost[] = await getBlogPosts();

  return (

        <div className="w-full"> 
            <div className="grid grid-cols-1">
              <div className="items-center">
                  {/* Pass the fetched data to the Client Component */}
                  <BlogPostsList initialPosts={initialPosts} />
              </div>
        </div>
      </div>

  );
}