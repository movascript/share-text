"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, lt } from "drizzle-orm";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export async function createPostAction(formData: FormData) {
  const encryptedContent = formData.get("encryptedContent") as string;
  const expiryMode = formData.get("expiryMode") as string; // '1h', '24h', '1w', 'burn', 'forever'

  if (!encryptedContent || encryptedContent.length > 20000) {
    return { error: "متن نامعتبر یا بیش از حد طولانی است." };
  }

  const id = nanoid(8);
  let expiresAt: Date | null = null;
  let burnOnRead = false;

  const now = new Date();
  switch (expiryMode) {
    case "1h":
      expiresAt = new Date(now.getTime() + 60 * 60 * 1000);
      break;
    case "24h":
      expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      break;
    case "1w":
      expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      break;
    case "burn":
      burnOnRead = true;
      break;
    case "forever":
      expiresAt = null;
      break;
  }

  try {
    await db.insert(posts).values({
      id,
      encryptedContent,
      expiresAt,
      burnOnRead,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "خطا در ذخیره سازی اطلاعات." };
  }

  redirect(`/${id}`);
}

export async function getPostData(id: string) {
  // cleanup expired content
  await db.delete(posts).where(lt(posts.expiresAt, new Date()));

  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  const post = result[0];

  if (!post) return null;

  if (post.burnOnRead) {
    await db.delete(posts).where(eq(posts.id, id));
  }

  return {
    encryptedContent: post.encryptedContent,
    createdAt: post.createdAt,
    burnOnRead: post.burnOnRead,
  };
}
