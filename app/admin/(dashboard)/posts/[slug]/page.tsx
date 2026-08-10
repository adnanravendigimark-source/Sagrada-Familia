import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { getTours } from "@/lib/data";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const tours = getTours();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900">Edit Post</h1>
      <p className="mt-1 text-sm text-stone-600">Editing "{post.title}"</p>
      <div className="mt-8 max-w-3xl">
        <PostForm initial={post} isNew={false} tours={tours} />
      </div>
    </div>
  );
}
