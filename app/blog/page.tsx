import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: `Articles and insights about 1031 exchanges, property identification, and tax deferral strategies.`,
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

const POSTS_PER_PAGE_DESKTOP = 6;
const POSTS_PER_PAGE_MOBILE = 3;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const postsPerPage = POSTS_PER_PAGE_DESKTOP;

  // TODO: Replace with actual Sanity query
  const allPosts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: string;
  }> = [];

  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = allPosts.slice(startIndex, endIndex);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="mb-12">
        <h1 className="mb-4 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
          Blog
        </h1>
        <p className="text-lg text-[#1E1E1E]/80">
          Articles and insights about 1031 exchanges and property identification.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-12 text-center">
          <p className="text-[#1E1E1E]/80">No posts yet. Check back soon.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 rounded-3xl border border-[#E5E7EB] bg-white p-6 transition hover:border-[#0C1E2E]/30 hover:shadow-lg"
              >
                <h2 className="font-semibold text-xl text-[#0C1E2E] group-hover:text-[#F5B32F] transition">
                  {post.title}
                </h2>
                <p className="flex-1 text-sm leading-relaxed text-[#1E1E1E]/80">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-xs text-[#1E1E1E]/60">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                  <span className="text-sm font-medium text-[#F5B32F]">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              {page > 1 && (
                <Link
                  href={`/blog?page=${page - 1}`}
                  className="rounded-full border border-[#E5E7EB] px-6 py-3 text-sm font-medium text-[#0C1E2E] transition hover:bg-[#FAFAFA]"
                >
                  Previous
                </Link>
              )}
              <span className="text-sm text-[#1E1E1E]/80">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/blog?page=${page + 1}`}
                  className="rounded-full border border-[#E5E7EB] px-6 py-3 text-sm font-medium text-[#0C1E2E] transition hover:bg-[#FAFAFA]"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

