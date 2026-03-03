import { getPostData } from "@/app/actions";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProtectedContent from "./ProtectedContent";
import ContentViewer from "./ContentViewer";
import Header from "@/components/Header";
import Link from "next/link";

export async function generateMetadata({
  params,
}: PageProps<"/[id]">): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: `متن ${resolvedParams.id}`,
    description: "مشاهده متن به اشتراک گذاشته شده.",
    robots: { index: false },
  };
}

export default async function PostPage({ params }: PageProps<"/[id]">) {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="flex gap-8 flex-col items-center justify-center min-h-[80vh] w-full">
      <Header />

      {post.encrypted ? (
        <ProtectedContent
          encryptedContent={post.content}
          createdAt={post.createdAt}
        />
      ) : (
        <ContentViewer content={post.content} createdAt={post.createdAt} />
      )}

      <Link
        href="/"
        className="inline-block text-gray-500 hover:text-black transition-colors text-sm border-b border-gray-300 hover:border-black pb-0.5"
      >
        اشتراک گذاری یک متن جدید
      </Link>
    </div>
  );
}
