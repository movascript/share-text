import DecryptViewer from "./DecryptViewer";
import { getPostData } from "@/app/actions";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "متن رمزنگاری شده - ShareText",
    description: "برای مشاهده این متن نیاز به رمز عبور دارید.",
    robots: { index: false },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostData(params.id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <DecryptViewer
        encryptedContent={post.encryptedContent}
        createdAt={post.createdAt}
        isBurnOnRead={post.burnOnRead}
      />
    </div>
  );
}
