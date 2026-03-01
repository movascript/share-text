// src/app/[id]/page.tsx
import { getPostData } from "@/app/actions";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProtectedContent from "./ProtectedContent";
import ContentViewer from "./ContentViewer";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: `پست ${resolvedParams.id} - ShareText`,
    description: "مشاهده متن به اشتراک گذاشته شده در ShareText",
    robots: { index: false },
  };
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      {post.encrypted ? (
        <ProtectedContent
          encryptedContent={post.content}
          createdAt={post.createdAt}
        />
      ) : (
        <ContentViewer content={post.content} createdAt={post.createdAt} />
      )}
    </div>
  );
}
