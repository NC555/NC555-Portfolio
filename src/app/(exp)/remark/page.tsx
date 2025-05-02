import Container from "@/app/(exp)/remark/_components/container";
import { HeroPost } from "@/app/(exp)/remark/_components/hero-post";
import { MoreStories } from "@/app/(exp)/remark/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import PageHeader from "@/components/page-header";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <article>
      <PageHeader header="Nati's Blog" />
      <Container>
        {allPosts.length > 0 ? (
          <>
            <HeroPost
              title={allPosts[0].title}
              coverImage={allPosts[0].coverImage}
              date={allPosts[0].date}
              author={allPosts[0].author}
              slug={allPosts[0].slug}
              excerpt={allPosts[0].excerpt}
            />
            {allPosts.slice(1).length > 0 && (
              <MoreStories posts={allPosts.slice(1)} />
            )}
          </>
        ) : (
          <p>No posts found.</p> // Optional: Add a message when no posts are available
        )}
      </Container>
    </article>
  );
}
